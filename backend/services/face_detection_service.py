from insightface.app import FaceAnalysis


face_app = FaceAnalysis(
    name="buffalo_l"
)

face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)

def detect_faces(image):

    faces = face_app.get(image)

    results = []

    for face in faces:

        results.append({
            "bbox": face.bbox.tolist(),
            "embedding": face.embedding
        })

    return results