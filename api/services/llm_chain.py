from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
    PromptTemplate,
)

# Prompt templates
system_template_keywords = PromptTemplate(
    input_variables=["html_content", "title", "url"],
    template="""You are a helpful assitant that helps people extract relevant keywords from a text.
    Maximum number of keywords: 10
    Minimum number of keywords: 5
    ----------------

    FINAL ANSWER EXAMPLE:
    keyword1, keyword2, keyword3, keyword4, keyword5

    ----------------

    Your answer SHOULD only contain the keywords without any aditional word or character.

    Get the keywords from the following text:

    title: {title}
    url: {url}
    html_content: {html_content}

    ----------------

    Your answer SHOULD only contain the keywords without any aditional word or character.   keyword, keyword, ...  
    """,
)

human_template_keywords = PromptTemplate(
    input_variables=[], template="give me 10 keywords"
)

# Chat Prompt objects
system_template_keywords_promt = SystemMessagePromptTemplate.from_template(
    system_template_keywords.template
)
human_template_keywords_promt = HumanMessagePromptTemplate.from_template(
    human_template_keywords.template
)
chat_keywords_prompt = ChatPromptTemplate.from_messages(
    [system_template_keywords_promt, human_template_keywords_promt]
)


def chain_keywords_generator(llm) -> LLMChain:
    # Memory
    script_memory = ConversationBufferMemory(
        input_key="html_content", memory_key="chat_history"
    )

    # Chain
    return LLMChain(
        llm=llm,
        prompt=chat_keywords_prompt,
        verbose=True,
        output_key="keywords",
        memory=script_memory,
    )
