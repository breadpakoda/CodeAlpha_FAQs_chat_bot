from fastapi import FastAPI
from pydantic import BaseModel
# from db_finder import result_answer
import chromadb


app = FastAPI()

class QueryRequest(BaseModel):
    question: str

@app.post('/query')
async def query(req: QueryRequest):
    try:
        chroma_client=chromadb.PersistentClient(path="../../chroma_db")
        collection= chroma_client.get_or_create_collection(name="Sample")
        
        result = collection.query(
            query_texts=req.question,
            n_results=1
        )
        answer = result["metadatas"][0][0]["answer"]


        return {"answer": answer}
    except Exception as e:
        print("Python error:", str(e))
        return {"answer": f"Error: {str(e)}"}
