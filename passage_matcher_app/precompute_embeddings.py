import json
import numpy as np
from sentence_transformers import SentenceTransformer

print("Loading agencies from firms_market_index.json...")
with open("firms_market_index.json", "r", encoding="utf-8") as f:
    firms = json.load(f)

print(f"Loaded {len(firms)} media agencies. Pre-computing embeddings using all-MiniLM-L6-v2...")
model = SentenceTransformer("all-MiniLM-L6-v2")

agency_texts = []
for f in firms:
    produce_str = ", ".join(f.get("produce_catalog", []))
    name = f.get("agency_name", f["firm_name"])
    spec = f.get("agency_specialty", "")
    persp = f.get("agency_perspective", f["firm_goal"])
    content = f"Media Agency: {name}. Specialty: {spec}. Perspective: {persp}. Concepts on Offer: {produce_str}. {f['text']}"
    agency_texts.append(content)

embeddings = model.encode(agency_texts, show_progress_bar=True, normalize_embeddings=True)
np.save("firms_embeddings.npy", embeddings)
print(f"Saved media agency embeddings matrix of shape {embeddings.shape} to firms_embeddings.npy!")
