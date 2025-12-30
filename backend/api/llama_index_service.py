import os
from dotenv import load_dotenv

from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
    Settings,
)
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

#  Load environment variables
load_dotenv()

#  Set up global embedding model (instead of OpenAI)
Settings.embed_model = HuggingFaceEmbedding(model_name="all-MiniLM-L6-v2")

#  Optionally export Gemini key for your own use
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

#  Paths
PERSIST_DIR = "./storage"
FILES_DIR = "my_app/files"

#  Index documents and save index
def index_documents(directory_path: str):
    documents = SimpleDirectoryReader(directory_path).load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    return index

#  Load the index from disk, or create it if it doesn't exist
def load_or_create_index():
    if not os.path.exists(PERSIST_DIR) or not os.listdir(PERSIST_DIR):
        os.makedirs(PERSIST_DIR, exist_ok=True)
        return index_documents(FILES_DIR)

    storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
    return load_index_from_storage(storage_context)

#  Run a query on the indexed PDFs
def query_pdf_text(query: str):
    if not os.listdir(PERSIST_DIR) or not os.listdir(FILES_DIR):
        return "Please add a PDF file to start querying."

    index = load_or_create_index()
    query_engine = index.as_query_engine()
    response = query_engine.query(query)
    return response.response

#  Delete uploaded PDFs and index data
def clear_files_directory():
    try:
        for directory in [FILES_DIR, PERSIST_DIR]:
            for filename in os.listdir(directory):
                path = os.path.join(directory, filename)
                if os.path.isfile(path):
                    os.remove(path)
        return {"message": "All files deleted successfully."}
    except Exception as e:
        return {"error": str(e)}
