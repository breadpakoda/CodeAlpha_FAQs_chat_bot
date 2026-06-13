import chromadb


try:
    chroma_client=chromadb.persistentClien(path="./chroma_db")
    collection=chroma_client.get_or_create_collection("sample")

except Exception as e:
    print(f"Error {e} occured")

ids=[]
documents=[]
embeddings=[]
metadata=[]

collection.add(

)