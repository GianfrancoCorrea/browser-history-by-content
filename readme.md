# Start extension
Install dependencies:

```bash
\> npm install
```

Run the development server:

```bash
\> npm run watch
```

Load the extension in Chrome:
- Open Chrome and go to chrome://extensions
- Enable Developer Mode
- Click on **Load Unpacked**
- Select the extension folder (**./dist**)


# Start API
(Recomended to use a **virtual environment**, see [Venv](https://docs.python.org/3/tutorial/venv.html) for more information about)

Install dependencies:


```bash
\> cd api
\api> pip install -r requirements.txt
```

Run the development server:

```bash
\api> python app.py
```

---

## Technologies Used

### Frontend
- [React JS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Webpack](https://webpack.js.org/) - A static module bundler for modern JavaScript applications.

### Backend
- [Langchain](https://langchain.readthedocs.io) - A framework for developing applications powered by language models.
- [OpenAI](https://openai.com/) - GPT-3 API for generating text. Embedding API for generating vectors.
- [Pinecone](https://www.pinecone.io/) - A vector database for machine learning.
- [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) - A Python library for pulling data out of HTML and XML files.
- [Flask](https://pypi.org/project/Flask/) - A micro web framework written in Python.

---
## Features Implemented

### Extension
- [x] Get history from chrome
- [x] Send page info to the API to get keywords and save them in pinecone
- [x] Search for keywords in API
- [x] Display results in extension
- [x] Handle cache in extension
- [ ] Loading animation UI


### API
- [x] Endpoints (add, search, delete)
- [x] Get relevant text from page (BeautifulSoup)
- [x] GPT assistant for generating keywords
- [x] Embedding API for generating vectors
- [x] Add keywords to pinecone database
- [x] Get search results from pinecone database
- [x] Clear database from pinecone

---

## Screenshots

![Extension](/readme/Screenshot_1.png "Extension")
![Search](/readme/Screenshot_2.png "Search")
![Flow](/readme/flow4.png "Flow")
