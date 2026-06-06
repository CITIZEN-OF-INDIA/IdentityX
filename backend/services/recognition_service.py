import pickle

from services.face_detection_service import detect_faces
from utils.similarity import cosine_similarity


with open(
    "database/faces.pkl",
    "rb"
) as f:
    database = pickle.load(f)


def find_match(
    query_embedding,
    threshold=0.50
):

    best_name = "Unknown"
    best_score = -1

    for student in database:

        name = student["name"]
        stored_embedding = student["embedding"]

        score = cosine_similarity(
            query_embedding,
            stored_embedding
        )

        if score > best_score:

            best_score = score
            best_name = name

    if best_score < threshold:
        best_name = "Unknown"

    return best_name, float(best_score)


def recognize(image):

    faces = detect_faces(image)

    results = []

    for face in faces:

        name, score = find_match(
            face["embedding"]
        )

        results.append({
            "name": name,
            "score": score,
            "bbox": face["bbox"]
        })

    return results