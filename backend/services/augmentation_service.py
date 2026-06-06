import cv2
import numpy as np


def rotate_image(image, angle):

    h, w = image.shape[:2]

    center = (w // 2, h // 2)

    matrix = cv2.getRotationMatrix2D(
        center,
        angle,
        1.0
    )

    rotated = cv2.warpAffine(
        image,
        matrix,
        (w, h)
    )

    return rotated


def brighten_image(image):

    return cv2.convertScaleAbs(
        image,
        alpha=1.2,
        beta=25
    )


def zoom_image(image, scale=1.1):

    h, w = image.shape[:2]

    new_h = int(h / scale)
    new_w = int(w / scale)

    start_x = (w - new_w) // 2
    start_y = (h - new_h) // 2

    cropped = image[
        start_y:start_y + new_h,
        start_x:start_x + new_w
    ]

    zoomed = cv2.resize(
        cropped,
        (w, h)
    )

    return zoomed