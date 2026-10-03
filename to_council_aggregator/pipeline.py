"""
Master Orchestration Pipeline for Thousand Oaks Civic Data Aggregator.
Automates scraping @ctomeetings, extracting agendas, building the knowledge graph, and generating briefings.
"""

import sys
import argparse
from scraper import sync_transcripts, fetch_channel_feed
from extractor import analyze_meeting
from knowledge_graph import build_knowledge_graph
from reporter import generate_all_reports
from visualizer import generate_dashboard_html


def run_full_pipeline(limit: int = 5):
    """Run all pipeline stages end-to-end."""
    print("=" * 65)
    print("  THOUSAND OAKS CIVIC DATA AGGREGATOR & KNOWLEDGE GRAPH PIPELINE")
    print("  Target: https://www.youtube.com/@ctomeetings")
    print("=" * 65)

    # Stage 1: Sync Transcripts
    print("\n[STAGE 1/5] Syncing YouTube Transcripts...")
    meetings = sync_transcripts(limit=limit)

    # Stage 2: Extract & Summarize
    print("\n[STAGE 2/5] Extracting Roll Call, Ordinances, Debates & Entities...")
    for m in meetings:
        try:
            analyze_meeting(m["video_id"], m)
        except Exception as e:
            print(f"Error analyzing {m.get('video_id')}: {e}")

    # Stage 3: Build Knowledge Graph
    print("\n[STAGE 3/5] Compiling Multi-Meeting Knowledge Graph (NetworkX)...")
    graph_data = build_knowledge_graph()

    # Stage 4: Generate Civic News Briefings
    print("\n[STAGE 4/5] Generating Markdown & HTML Civic News Briefings...")
    reports = generate_all_reports()

    # Stage 5: Render Interactive Web Dashboard
    print("\n[STAGE 5/5] Generating Standalone Interactive Visual Dashboard...")
    dashboard_file = generate_dashboard_html()

    print("\n" + "=" * 65)
    print("  PIPELINE EXECUTION COMPLETE!")
    print(f"  • Meetings Processed: {len(meetings)}")
    print(f"  • Knowledge Graph: {graph_data['meta']['node_count']} nodes, {graph_data['meta']['edge_count']} edges")
    print(f"  • Civic Reports: {len(reports)} generated")
    print(f"  • Visual Dashboard: {dashboard_file}")
    print("=" * 65)


def main():
    parser = argparse.ArgumentParser(description="Thousand Oaks Civic Meeting Aggregator & Knowledge Graph")
    parser.add_argument("--all", action="store_true", help="Run full pipeline (sync, analyze, graph, reports, dashboard)")
    parser.add_argument("--sync", action="store_true", help="Sync channel RSS and captions")
    parser.add_argument("--analyze", action="store_true", help="Extract items and entities from cached transcripts")
    parser.add_argument("--graph", action="store_true", help="Rebuild knowledge graph JSON")
    parser.add_argument("--reports", action="store_true", help="Generate Markdown briefings")
    parser.add_argument("--dashboard", action="store_true", help="Build interactive HTML dashboard")
    parser.add_argument("--limit", type=int, default=5, help="Number of recent meetings to process (default: 5)")

    args = parser.parse_args()

    # If no flags passed, default to --all
    if not any([args.all, args.sync, args.analyze, args.graph, args.reports, args.dashboard]):
        args.all = True

    if args.all:
        run_full_pipeline(limit=args.limit)
    else:
        if args.sync:
            sync_transcripts(limit=args.limit)
        if args.analyze:
            videos = fetch_channel_feed(limit=args.limit)
            for v in videos:
                try:
                    analyze_meeting(v["video_id"], v)
                except Exception as e:
                    print(f"Skipping {v['video_id']}: {e}")
        if args.graph:
            build_knowledge_graph()
        if args.reports:
            generate_all_reports()
        if args.dashboard:
            generate_dashboard_html()


if __name__ == "__main__":
    main()
