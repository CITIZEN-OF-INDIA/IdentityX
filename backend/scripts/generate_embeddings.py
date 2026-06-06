import os
import cv2
import pickle
import numpy as np
import sys

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)


from services.embedding_service import (
    EmbeddingService
)

embedding_service = EmbeddingService()

DATASET_DIR = "dataset"
OUTPUT_FILE = "database/faces.pkl"

database = []

for person_name in os.listdir(DATASET_DIR):

    person_folder = os.path.join(
        DATASET_DIR,
        person_name
    )

    if not os.path.isdir(person_folder):
        continue

    print(f"Processing {person_name}")

    for image_name in os.listdir(person_folder):

        image_path = os.path.join(
            person_folder,
            image_name
        )

        image = cv2.imread(image_path)

        if image is None:
            continue

        embedding = (
            embedding_service.get_embedding(
                image
            )
        )

        if embedding is None:
            continue

        database.append(
            {
                "name": person_name,
                "embedding": embedding
            }
        )

with open(
    OUTPUT_FILE,
    "wb"
) as f:

    pickle.dump(
        database,
        f
    )

print(
    f"{len(database)} embeddings saved."
)