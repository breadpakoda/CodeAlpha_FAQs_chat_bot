from sentence_transformers import SentenceTransformer
from text_processing import data_processor

def encoder():
    q_a_paris=data_processor()
    model=SentenceTransformer("all-MiniLM-L6-v2")

    for pair in q_a_paris:
        pair["embedding"]=model.encode(pair["question"])

    return q_a_paris

    


