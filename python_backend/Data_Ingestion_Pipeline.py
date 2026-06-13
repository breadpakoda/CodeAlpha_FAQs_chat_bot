from pypdf import PdfReader

def text_extractor():
    path=input("File path: ")
    try:
        text=""
        reader=PdfReader(path)
        for page in reader.pages:
            text+=page.extract_text()
        
        return text


    except FileNotFoundError:
        print("File not found")
    except Exception as e:
        print("An error occured")

        
