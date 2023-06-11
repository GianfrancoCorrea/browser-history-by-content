from flask import Flask, request
from bs4 import BeautifulSoup, Comment
import configparser
from services.assistant import GPTAssistant
from services.pinecone_index import IndexService
import requests

app = Flask(__name__)

config = configparser.ConfigParser()
config.read("config.ini")

assistant_api_key = config["DEFAULT"]["API-KEY"]
gpt_assistant = GPTAssistant(assistant_api_key)


@app.route("/api/html", methods=["POST"])
def receive_html():
    url = request.form.get("url")  # Recibir la lista de URLs desde la solicitud POST
    title = request.form.get("title")
    id = request.form.get("id")

    response = requests.get(url)  # Acceder a cada URL utilizando requests
    extracted_text = {}

    if response.status_code == 200:
        html_content = response.text

        # Beautiful Soup para analizar el contenido HTML
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

        # Remover comentarios
        comments = soup.findAll(text=lambda text: isinstance(text, Comment))

        combined_tags = []
        for tag in tags:
            for match in soup.findAll(tag):
                # match.unwrap()
                combined_tags.append(match)

        # Remover comentarios
        for c in comments:
            c.extract()

        # Crear un objeto JSON con el texto extraído, key = nombre de la etiqueta, value = texto
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

        # Obtener la URL y el título y enviarlo al asistente
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

    # obtener las palabras clave del asistente y agregarlas al objeto JSON [done]
    # guardar en la base de datos vectorial
    # endpoint para hacer querys a la base de datos vectorial [done]
    # usar tiktoken para controlar el limite de tokens a GPT
    # eliminar datos de la base de datos vectorial
    # error handling

    return generated_data


# search endpoint
@app.route("/api/search", methods=["POST"])
def search():
    query = request.form.get("query")
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


if __name__ == "__main__":
    app.run()
