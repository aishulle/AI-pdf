# backend/router.py
from fastapi import APIRouter
from pydantic import BaseModel
from llama_index import GPTVectorStoreIndex, Document
from .llama_index_service import get_index  # if needed

router = APIRouter()

# Define the request body schema using Pydantic
class QueryRequest(BaseModel):
    query: str

# Dummy documents to simulate the index (replace with actual PDF/text documents)
documents = [Document(text="This is a sample PDF text that will be queried.")]
index = GPTVectorStoreIndex.from_documents(documents)

# Define the /ask route (POST method)
@router.post("/ask")
async def ask_question(query_request: QueryRequest):
    query = query_request.query  # Extract the query string from the request
    try:
        # Query the index for the answer
        response = index.query(query)  # Run the query through the LlamaIndex
        return {"answer": response}  # Return the answer as a JSON response
    except Exception as e:
        return {"error": str(e)}  # Return an error message if something goes wrong
