from pydantic import BaseModel
from datetime import datetime

class Document(BaseModel):
    filename: str
    upload_date: datetime
    text_length: int