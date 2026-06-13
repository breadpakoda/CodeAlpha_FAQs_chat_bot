from Data_Ingestion_Pipeline import text_extractor
import re
import string

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()


def preprocess_question(question):

    question = question.lower()

    question = question.translate(
        str.maketrans("", "", string.punctuation)
    )

    tokens = word_tokenize(question)

    tokens = [
        word for word in tokens
        if word not in stop_words
    ]

    tokens = [
        lemmatizer.lemmatize(word)
        for word in tokens
    ]

    return " ".join(tokens)


def data_processor():

    text = text_extractor()

    # Split into question blocks
    blocks = re.split(r'(?=Q\.\d+\.)', text)

    processed_text = []

    for block in blocks:

        block = block.strip()

        if not re.match(r'^Q\.\d+\.', block):
            continue

        lines = [line.strip() for line in block.splitlines() if line.strip()]

        question_parts = []
        answer_parts = []

        collecting_question = True

        for line in lines:

            if re.match(r'^Q\.\d+\.', line):

                line = re.sub(r'^Q\.\d+\.\s*', '', line)
                question_parts.append(line)

                if '?' in line:
                    collecting_question = False

            elif collecting_question:

                question_parts.append(line)

                if '?' in line:
                    collecting_question = False

            else:

                answer_parts.append(line)

        question = " ".join(question_parts)
        answer = " ".join(answer_parts)

        processed_text.append({
            "question": preprocess_question(question),
            "answer": answer
        })

    return processed_text


