from Data_Ingestion_Pipeline import text_extractor
import re



def data_processor():
    text = text_extractor().strip()

    processed_questions = []

    for line in text.splitlines():

        line = line.strip()

        if line.startswith("Q"):

            question = re.sub(r"^Q\.\d+\.\s*", "", line)

            question = " ".join(question.split())

            question = question.lower()

            print(question)

        else:
            # write your logic here
            pass

    return processed_questions
                

      
            


print(data_processor())