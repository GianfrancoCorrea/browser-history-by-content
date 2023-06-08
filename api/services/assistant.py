from langchain.chat_models import ChatOpenAI
from services.llm_chain import chain_keywords_generator
import os


class GPTAssistant:
    def __init__(self, api_key: str):
        os.environ["OPENAI_API_KEY"] = api_key
        self.llm = ChatOpenAI(
            temperature=0, model_name="gpt-3.5-turbo", request_timeout=120, client=None
        )

    def generate_keywords(self, **kwargs):
        # chains
        keywords_chain = chain_keywords_generator(self.llm)

        return keywords_chain.run(**kwargs)
