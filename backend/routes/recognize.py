from fastapi import APIRouter
from fastapi import UploadFile

from utils.image_utils import bytes_to_image
from services.recognition_service import recognize


router = APIRouter()


@router.post("/recognize")
async def recognize_faces(
    file: UploadFile
):

    image_bytes = await file.read()

    image = bytes_to_image(
        image_bytes
    )

    results = recognize(
        image
    )

    recognized_names = [
        face["name"]
        for face in results
    ]

    return {
        "faces": results,
        "recognized_names": recognized_names,
        "count": len(recognized_names)
    }