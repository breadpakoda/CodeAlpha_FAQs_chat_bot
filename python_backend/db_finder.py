import chromadb
# from sentence_transformers import SentenceTransformer

# model=SentenceTransformer("all-MiniLM-L6-v2")


chroma_client=chromadb.PersistentClient(path="./chroma_db")

collection= chroma_client.get_or_create_collection(name="Sample")

# user_embedding=model.encode(input("Question: "))
result=collection.query(
    # query_embeddings=user_embedding,
    query_texts=input("question: "),
    n_results=1

)

print(f"Answer:{result["metadatas"][0][0]["answer"]}")