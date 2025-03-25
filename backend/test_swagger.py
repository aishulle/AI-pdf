from fastapi import FastAPI, APIRouter

app = FastAPI()

router = APIRouter(prefix="/api")

@router.get("/ping")
async def ping():
    return {"status": "pong"}

@router.post("/upload")
async def upload():
    return {"msg": "uploaded"}

@router.get("/documents")
async def get_docs():
    return {"docs": ["a", "b", "c"]}

@router.delete("/documents")
async def delete_docs():
    return {"msg": "all deleted"}

app.include_router(router)
