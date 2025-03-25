# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from backend.api.routes import pdf_routes

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Directly include the router
# app.include_router(pdf_routes.router)

# # 🔍 Print all registered routes
# print("📡 Registered Routes:")
# for route in app.routes:
#     print(f"{route.path} → {route.methods}")
# print("🔥 Hello from MAIN.PY")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from backend.api.routes import pdf_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_routes.router)

@app.on_event("startup")
async def print_openapi_schema():
    print("📡 Registered Routes:")
    for route in app.routes:
        print(f"{route.path} → {route.methods}")
    
    schema = get_openapi(title="Test API", version="1.0.0", routes=app.routes)
    print("🧾 OpenAPI Schema Paths:", list(schema["paths"].keys()))

print("🔥 Hello from MAIN.PY")

