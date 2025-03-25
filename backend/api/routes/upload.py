# from fastapi import UploadFile, HTTPException
# from backend.api.llama_index_service import index_documents  # ✅ Absolute import
# from pathlib import Path
# import os
# import uuid

# # Directory where uploaded PDFs will be stored
# UPLOAD_DIR = Path("uploaded_pdfs")

# def secure_filename(filename: str) -> str:
#     """Sanitize and secure the filename."""
#     return os.path.basename(filename.replace(" ", "_"))

# def get_upload_directory() -> Path:
#     """Ensure the upload directory exists and return its path."""
#     upload_dir = UPLOAD_DIR.resolve()
#     upload_dir.mkdir(parents=True, exist_ok=True)
#     return upload_dir

# async def handle_pdf_upload(file: UploadFile):
#     """Handle saving the uploaded PDF and indexing it."""
#     upload_dir = get_upload_directory()
    
#     # Generate a unique document ID
#     doc_id = str(uuid.uuid4())
#     filename = secure_filename(file.filename)
#     saved_filename = f"{doc_id}_{filename}"
#     file_path = upload_dir / saved_filename

#     try:
#         # Read file contents
#         contents = await file.read()

#         # Save to disk
#         with open(file_path, "wb") as f:
#             f.write(contents)

#         print(f"✅ File saved to: {file_path}")
#         print(f"📦 File size: {file_path.stat().st_size} bytes")

#         # Index documents (your indexing logic can use UPLOAD_DIR)
#         index_documents(str(UPLOAD_DIR))

#         return {
#             "message": "File uploaded and indexed successfully",
#             "filename": filename,
#             "doc_id": doc_id
#         }

#     except Exception as e:
#         print(f"❌ Error saving file: {e}")
#         raise HTTPException(status_code=500, detail="Failed to save and index the file.")
from fastapi import UploadFile, HTTPException
from backend.api.llama_index_service import index_documents
from pathlib import Path
import os
import uuid

UPLOAD_DIR = Path("uploaded_pdfs")

def secure_filename(filename: str) -> str:
    return os.path.basename(filename.replace(" ", "_"))

def get_upload_directory() -> Path:
    upload_dir = UPLOAD_DIR.resolve()
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir

async def handle_pdf_upload(file: UploadFile, timestamp):
    upload_dir = get_upload_directory()
    
    doc_id = str(uuid.uuid4())
    filename = f"{secure_filename(file.filename)}_{timestamp}"
    saved_filename = f"{doc_id}_{filename}"
    file_path = upload_dir / saved_filename

    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        print(f"✅ File saved to: {file_path}")
        print(f"📦 File size: {file_path.stat().st_size} bytes")

        # Index the file or directory
        index_documents(str(UPLOAD_DIR))

        # Return info for DB + response
        return {
            "filename": filename,
            "saved_filename": saved_filename,
            "filepath": str(file_path),
            "doc_id": doc_id
        }

    except Exception as e:
        print(f"❌ Error saving file: {e}")
        raise HTTPException(status_code=500, detail="Failed to save and index the file.")
