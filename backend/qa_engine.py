import google.generativeai as genai
from llm_config import GOOGLE_API_KEY  # Updated variable name

# Configure Google Generative AI
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')  # Use the correct model name

# Function to get answers from text
def get_answer_from_text(text: str, question: str) -> str:
    # Combine the text and question for context
    prompt = f"Context: {text}\n\nQuestion: {question}"
    response = model.generate_content(prompt)
    return response.text