from flask import Flask, request
from bs4 import BeautifulSoup
import configparser
from services.assistant import GPTAssistant
from services.pinecone_index import IndexService
import requests

app = Flask(__name__)

config = configparser.ConfigParser()
config.read("config.ini")

assistant_api_key = config["DEFAULT"]["API-KEY"]
gpt_assistant = GPTAssistant(assistant_api_key)


@app.route("/api/add", methods=["POST"])
def receive_html():
    url = request.form.get("url")
    title = request.form.get("title")
    id = request.form.get("id")

    response = requests.get(url)
    extracted_text = {}

    if response.status_code == 200:
        html_content = response.text

        # Beautiful Soup to parse the HTML content
        soup = BeautifulSoup(html_content, "html.parser")

        tags = [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "a",
            "ul",
            "ol",
            "li",
            "table",
            "tr",
            "td",
            "th",
            "span",
        ]

        combined_tags = []
        for tag in tags:
            for match in soup.findAll(tag):
                combined_tags.append(match)

        # Create a JSON object with the extracted text, key = tag name, value = text.
        for tag in combined_tags:
            for t in tag:
                text = t.text
                text = text.replace("\n", "")
                if t.name in extracted_text:
                    extracted_text[t.name] = extracted_text[t.name] + "|" + text
                else:
                    extracted_text[t.name] = text

        extracted_text = str(extracted_text)

        print("Pages processed: " + str(len(extracted_text)))

        # Get the URL and title and send it to the assistant
        keywords = gpt_assistant.generate_keywords(
            html_content=extracted_text,
            url=url,
            title=title,
        )

    else:
        print("Error: " + str(response.status_code))

    generated_data = {
        "id": id,
        "url": url,
        "title": title,
        "text": extracted_text,
        "keywords": keywords,
    }

    # save to pinecone
    index = IndexService()
    index.add({"url": url, "title": title, "text": keywords})

    response = {
        "status": "success",
        "data": generated_data,
    }

    return response


# search endpoint
@app.route("/api/search", methods=["GET"])
def search():
    query = request.args.get("query")
    print(query)

    # search in pinecone
    index = IndexService()
    results = index.query(query)

    print(results[0].page_content)

    response = []

    for result in results:
        print(result.metadata)

        response.append(
            {
                "url": result.metadata.get("source", ""),
                "title": result.metadata.get("title", ""),
                "keywords": result.page_content,
            }
        )

    return response


# delete endpoint
@app.route("/api/clear", methods=["DELETE"])
def clear():
    index = IndexService()
    index.clear()

    response = {
        "status": "success",
    }

    return response


if __name__ == "__main__":
    app.run()
