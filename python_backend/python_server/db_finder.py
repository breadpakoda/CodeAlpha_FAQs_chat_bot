import chromadb
# from sentence_transformers import SentenceTransformer

# model=SentenceTransformer("all-MiniLM-L6-v2")


chroma_client=chromadb.PersistentClient(path="./chroma_db")

collection= chroma_client.get_or_create_collection(name="Sample")

# user_embedding=model.encode(input("Question: "))
def result_answer(user_query):
    result=collection.query(
        # query_embeddings=user_embedding,
        query_texts=user_query,
        n_results=1

    )

    return result["metadatas"][0][0]["answer"]

