from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from pathlib import Path
import os
import time
import logging
from backend.api.routes.upload import handle_pdf_upload
from ..database import get_db
from ..pdf_model import PDFDocument

router = APIRouter(prefix="/api")
logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.DEBUG)

UPLOAD_DIR = Path("uploaded_pdfs")  # Ensure consistency with upload.py
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# 1. Ping route
@router.get("/ping")
async def ping():
    logger.debug('ping!')
    return {"status": "e"}

# 2. Upload route
@router.post(
    "/upload",
    summary="Upload PDF File",
    description="Upload a PDF file for processing",
    responses={
        200: {"description": "Successful PDF upload"},
        400: {"description": "Invalid file type"}
    }
)
async def upload_pdf(
    file: UploadFile = File(..., description="PDF file to upload", media_type="application/pdf"),
    db: Session = Depends(get_db)
):
    logger.debug('ok')
    
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Save file and get metadata
    
    timestamp = time.time()

    upload_result = await handle_pdf_upload(file, timestamp)

    # Save metadata in DB
    print(timestamp)
    doc = PDFDocument(
        file_name=upload_result["filename"],
        filepath=upload_result["filepath"]
    )
    print(doc)
    db.add(doc)
    db.commit()
    db.refresh(doc)

    return {"message": "Upload successful", "document_id": doc.id}

# 3. Get all documents
@router.get("/documents")
async def get_all_documents(db: Session = Depends(get_db)):
    documents = db.query(PDFDocument).all()
    return {"documents": documents}

# 4. Delete all documents
@router.delete("/documents")
async def delete_all_documents(db: Session = Depends(get_db)):
    deleted_files = []
    docs = db.query(PDFDocument).all()

    for doc in docs:
        if os.path.exists(doc.filepath):
            os.remove(doc.filepath)
            deleted_files.append(doc.file_name)
        db.delete(doc)

    db.commit()
    return {"message": "All documents deleted", "deleted_files": deleted_files}

print("✅ pdf_routes.py LOADED with 4 routes")
