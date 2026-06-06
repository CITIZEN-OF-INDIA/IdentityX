import os
import cv2
import sys

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)


from services.augmentation_service import (
    rotate_image,
    brighten_image,
    zoom_image
)


DATASET_PATH = "dataset"


for person_name in os.listdir(DATASET_PATH):

    person_folder = os.path.join(
        DATASET_PATH,
        person_name
    )

    if not os.path.isdir(person_folder):
        continue

    for file_name in os.listdir(person_folder):

        if "_aug" in file_name:
            continue

        image_path = os.path.join(
            person_folder,
            file_name
        )

        image = cv2.imread(image_path)

        if image is None:
            continue

        name, ext = os.path.splitext(file_name)

        aug1 = rotate_image(
            image,
            15
        )

        aug2 = rotate_image(
            image,
            -15
        )

        bright = brighten_image(image)
        aug3 = zoom_image(bright)

        cv2.imwrite(
            os.path.join(
                person_folder,
                f"{name}_15degrees_clock{ext}"
            ),
            aug1
        )

        cv2.imwrite(
            os.path.join(
                person_folder,
                f"{name}_15degrees_counterclock{ext}"
            ),
            aug2
        )

        cv2.imwrite(
            os.path.join(
                person_folder,
                f"{name}_zoomed{ext}"
            ),
            aug3
        )

        print(
            f"Generated augmentations for {file_name}"
        )