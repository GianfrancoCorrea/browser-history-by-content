from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.schema import Document
import configparser
import pinecone
import os


config = configparser.ConfigParser()
ini_path = os.path.join(os.getcwd(), "config.ini")
config.read(ini_path)

PINECONE_API_KEY = config["DEFAULT"]["PINECONE_API_KEY"]
PINECONE_ENV = config["DEFAULT"]["PINECONE_ENV"]


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
            metadata={
                "source": data["url"],
                "title": data["title"],
            },
        )
        documents.append(document)

        return documents

    def add(self, data: dict):
        documents = self.generate_documents(data)

        print("Adding texts to index...")
        print("Number of texts: ", len(documents))
        print("texts: ", documents)

        index = Pinecone.from_existing_index(self.index_name, self.embeddings)

        index.add_texts(
            [t.page_content for t in documents],
            metadatas=[t.metadata for t in documents],
        )

    def query(self, query):
        docsearch = Pinecone.from_existing_index(self.index_name, self.embeddings)
        results = docsearch.similarity_search(query)
        return results

    def clear(self):
        index = pinecone.Index(self.index_name)
        index.delete(deleteAll="true", namespace="")
