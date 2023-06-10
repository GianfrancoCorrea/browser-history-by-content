from flask import Flask, request
from bs4 import BeautifulSoup, Comment
import configparser
from services.assistant import GPTAssistant
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
    # pause execution to debug
    input("Press Enter to continue...")

    response = requests.get(url)  # Acceder a cada URL utilizando requests

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
        extracted_text = {}
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
        """ keywords = gpt_assistant.generate_keywords(
            html_content=extracted_text,
            url=url,
            title="",
        )
        """

    generated_data = {
        "id": id,
        "text": extracted_text,
        "title": title,
        "url": url,
    }

    # obtener las palabras clave del asistente y agregarlas al objeto JSON
    # guardar en la base de datos vectorial
    # endpoint para hacer querys a la base de datos vectorial

    return generated_data


# search endpoint
@app.route("/api/search", methods=["POST"])
def search():
    query = request.form.get("query")
    print(query)
    return query


if __name__ == "__main__":
    app.run()
