import chromadb
from embedder import encoder
import hashlib

output_list=encoder()


try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    

except Exception as e:
    print(f"Error {e} occured")

collection = chroma_client.get_or_create_collection(name="Sample")

ids=[]
documents=[]
embeddings=[]
metadata=[]

for item in output_list:
    ids.append(
        hashlib.md5(item["question"].encode()).hexdigest()
    )
    documents.append(item["question"])
    embeddings.append(item["embedding"].tolist())
    metadata.append({'answer':item["answer"]})

collection.upsert(
    ids=ids,
    documents=documents,
    embeddings=embeddings,
    metadatas=metadata

)