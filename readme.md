To use this project, closne the repo in your sytem and isntall all the packeges and dependencies.

This project has 2 sengments, 1st one is responisble for taking the pdf file's location that has all the FAQs ,one example FAQ pdf is there in the repo , you can use tha, so the 1st segment extracts the text from the pdf , prepare the data using NLTK for the next step, embedd the questiones and then store it to the chromadb

The other semgment of the project is for quering the user's question in the chromadb, this segment finds the most similar embedding in the chromdb with the help of inbuilt cosine similarity search function of chromadb. Then the most related/similar answer is reflected on the client side.

please contact- adityasing272@gmail.com for any queries