"""
Knowledge Graph Builder for Thousand Oaks Municipal Governance.
Aggregates Councilmembers, Ordinances, Developers, Projects, and Voting Records using NetworkX.
"""

import os
import json
import glob
from typing import Dict, List, Any
import networkx as nx

from config import (
    SUMMARIES_DIR,
    GRAPH_DATA_FILE,
    KEY_OFFICIALS
)


class MunicipalKnowledgeGraph:
    """Manages the civic graph of Thousand Oaks municipal decisions and entities."""

    def __init__(self):
        self.graph = nx.MultiDiGraph()
        self.metadata = {
            "municipality": "Thousand Oaks, CA",
            "channel": "@ctomeetings",
            "last_updated": None
        }

    def load_from_summaries(self):
        """Read all JSON summaries from data/summaries/ and populate the graph."""
        summary_files = glob.glob(os.path.join(SUMMARIES_DIR, "*.json"))
        print(f"Loading {len(summary_files)} meeting summaries into Knowledge Graph...")

        for s_file in summary_files:
            try:
                with open(s_file, "r", encoding="utf-8") as f:
                    summary = json.load(f)
                    self.add_meeting_data(summary)
            except Exception as e:
                print(f"Error reading summary {s_file}: {e}")

        self.compute_graph_metrics()

    def add_meeting_data(self, summary: Dict[str, Any]):
        """Ingest nodes and edges from an analyzed meeting summary."""
        graph_elements = summary.get("graph_elements", {})
        nodes = graph_elements.get("nodes", [])
        edges = graph_elements.get("edges", [])

        # Add Nodes
        for n in nodes:
            node_id = n["id"]
            node_attrs = {k: v for k, v in n.items() if k != "id"}
            if self.graph.has_node(node_id):
                # Update existing node attributes
                self.graph.nodes[node_id].update(node_attrs)
            else:
                self.graph.add_node(node_id, **node_attrs)

        # Add Edges
        for e in edges:
            source = e["source"]
            target = e["target"]
            relation = e.get("relation", "RELATED_TO")
            edge_attrs = {k: v for k, v in e.items() if k not in ["source", "target"]}
            self.graph.add_edge(source, target, key=relation, **edge_attrs)

    def compute_graph_metrics(self):
        """Calculate degree centrality and key node influencers."""
        undirected = self.graph.to_undirected()
        centrality = nx.degree_centrality(undirected) if len(undirected) > 0 else {}
        for node_id, cent_score in centrality.items():
            self.graph.nodes[node_id]["centrality"] = round(cent_score, 4)

    def export_json(self, output_path: str = GRAPH_DATA_FILE):
        """Export nodes and links for web visualization (D3.js / Vis.js)."""
        nodes_list = []
        for node_id, data in self.graph.nodes(data=True):
            node_record = {"id": node_id, **data}
            nodes_list.append(node_record)

        links_list = []
        for u, v, k, data in self.graph.edges(keys=True, data=True):
            link_record = {
                "source": u,
                "target": v,
                "relation": k,
                **data
            }
            links_list.append(link_record)

        payload = {
            "meta": {
                "municipality": "Thousand Oaks, California",
                "source_channel": "https://www.youtube.com/@ctomeetings",
                "node_count": len(nodes_list),
                "edge_count": len(links_list)
            },
            "nodes": nodes_list,
            "links": links_list
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)

        print(f"Exported Knowledge Graph to {output_path} ({len(nodes_list)} nodes, {len(links_list)} edges).")
        return payload

    def get_official_record(self, official_name: str) -> Dict[str, Any]:
        """Query actions, votes, and attendance for a specific official."""
        official_id = f"official_{official_name.replace(' ', '_').lower()}"
        if not self.graph.has_node(official_id):
            return {"error": f"Official {official_name} not found in graph"}

        votes = []
        meetings = []
        for _, target, data in self.graph.out_edges(official_id, data=True):
            target_data = self.graph.nodes[target]
            rel = data.get("relation", "")
            if "VOTE" in rel:
                votes.append({
                    "item": target_data.get("label", target),
                    "vote": rel,
                    "title": target_data.get("title", "")
                })
            elif "ATTENDED" in rel:
                meetings.append({
                    "meeting": target_data.get("label", target),
                    "date": target_data.get("date", "")
                })

        return {
            "name": official_name,
            "role": KEY_OFFICIALS.get(official_name, {}).get("role", "Official"),
            "meetings_attended": len(meetings),
            "votes_cast": votes
        }


def build_knowledge_graph():
    """Main function to refresh and export graph."""
    kg = MunicipalKnowledgeGraph()
    kg.load_from_summaries()
    return kg.export_json()


if __name__ == "__main__":
    build_knowledge_graph()
