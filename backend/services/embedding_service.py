import numpy as np
from insightface.app import FaceAnalysis


class EmbeddingService:

    def __init__(self):

        self.app = FaceAnalysis(
            providers=["CPUExecutionProvider"]
        )

        self.app.prepare(
            ctx_id=0,
            det_size=(640, 640)
        )

    def get_embedding(self, image):

        faces = self.app.get(image)

        if len(faces) == 0:
            return None

        # largest face
        face = max(
            faces,
            key=lambda f:
            (f.bbox[2] - f.bbox[0]) *
            (f.bbox[3] - f.bbox[1])
        )

        embedding = np.array(
            face.embedding,
            dtype=np.float32
        )

        return embedding