from flask import Flask, request
from bs4 import BeautifulSoup, Comment
import configparser
from services.assistant import GPTAssistant

app = Flask(__name__)

config = configparser.ConfigParser()
config.read("config.ini")

assistant_api_key = config["DEFAULT"]["API-KEY"]
gpt_assistant = GPTAssistant(assistant_api_key)


@app.route("/api/html", methods=["POST"])
def receive_html():
    html_content = request.form.get("html")
    # Beautiful Soup to parse the HTML content.
    soup = BeautifulSoup(html_content, "html.parser")

    tags_p = soup.find_all("p")
    tags_h1 = soup.find_all("h1")
    tags_h2 = soup.find_all("h2")
    tags_h3 = soup.find_all("h3")
    tags_h4 = soup.find_all("h4")
    tags_h5 = soup.find_all("h5")
    tags_h6 = soup.find_all("h6")
    tags_a = soup.find_all("a")
    tags_ul = soup.find_all("ul")
    tags_ol = soup.find_all("ol")
    tags_li = soup.find_all("li")
    tags_table = soup.find_all("table")
    tags_tr = soup.find_all("tr")
    tags_td = soup.find_all("td")
    tags_th = soup.find_all("th")
    tags_span = soup.find_all("span")

    combined_tags = [
        tags_p,
        tags_h1,
        tags_h2,
        tags_h3,
        tags_h4,
        tags_h5,
        tags_h6,
        tags_a,
        tags_ul,
        tags_ol,
        tags_li,
        tags_table,
        tags_tr,
        tags_td,
        tags_th,
        tags_span,
    ]

    #  create a JSON object with the extracted text key = tag name, value = text
    extracted_text = {}
    for tag in combined_tags:
        for t in tag:
            text = t.text
            text = text.replace("\n", "")
            if t.name in extracted_text:
                extracted_text[t.name] = extracted_text[t.name] + " | " + text
            else:
                extracted_text[t.name] = text

    extracted_text = str(extracted_text)

    # get the url and title and sendit to the assistant
    keywords = gpt_assistant.generate_keywords(
        html_content=extracted_text,
        url=request.form.get("url"),
        title=request.form.get("title"),
    )

    print(keywords)

    return keywords


if __name__ == "__main__":
    app.run()
