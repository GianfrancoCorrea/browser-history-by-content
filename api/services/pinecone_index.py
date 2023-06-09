from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import configparser
import pinecone
import os
from langchain.schema import Document
import streamlit as st

config = configparser.ConfigParser()
ini_path = os.path.join(os.getcwd(), "config.ini")
config.read(ini_path)

PINECONE_API_KEY = config["DEFAULT"]["PINECONE_API_KEY"]
PINECONE_ENV = config["DEFAULT"]["PINECONE_ENV"]
API_KEY = config["DEFAULT"]["API-KEY"]
os.environ["OPENAI_API_KEY"] = API_KEY


class IndexService:
    def __init__(self):
        self.index_name = "history-challenge"
        self.embeddings = OpenAIEmbeddings()
        # initialize pinecone
        pinecone.init(
            api_key=PINECONE_API_KEY,  # find at app.pinecone.io
            environment=PINECONE_ENV,  # next to api key in console
        )

    def generate_documents(self, data):
        documents = []

        document = Document(
            page_content=data["text"],
            metadata={"source": data["url"], "title": data["title"]},
        )
        documents.append(document)

        return documents

    def add(self, data):
        documents = self.generate_documents(data)

        print("Adding texts to index...")
        print("Number of texts: ", len(documents))
        print("texts: ", documents)

        # if you already have an index, you can load it like this
        index = Pinecone.from_existing_index(self.index_name, self.embeddings)

        index.add_texts(
            [t.page_content for t in documents],
            metadatas=[t.metadata for t in documents],
        )

    def query(self, query):
        docsearch = Pinecone.from_existing_index(self.index_name, self.embeddings)
        results = docsearch.similarity_search(query)
        return results


st.title("History Challenge")
st.write("This is a demo of the History Challenge")

st.header("Add a document to the index")
url = st.text_input("URL")
title = st.text_input("Title")
text = st.text_area("Text")

if st.button("Add"):
    data = {
        "url": url,
        "title": title,
        "text": text,
    }
    st.info(data)
    index_service = IndexService()
    index_service.add(data)

st.header("Query the index")
query = st.text_input("Query the db")
if st.button("Query"):
    index_service = IndexService()
    results = index_service.query(query)
    st.write(results)
