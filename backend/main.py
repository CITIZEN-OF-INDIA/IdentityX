from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.recognize import router as recognize_router

app = FastAPI(
    title="FaceRecognitionAI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    recognize_router
)

@app.get("/")
def home():
    return {
        "message": "FaceRecognitionAI Running"
    }