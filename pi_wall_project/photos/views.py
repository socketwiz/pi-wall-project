from django.http import JsonResponse
from django.shortcuts import render
from os import listdir
from os.path import isfile, join
from random import randint


def index(request):
    return render(request, 'photos/index.html')


def next_image(request):
    image_path = 'static/images/carousel'
    photos = [
        image for image in listdir(image_path) if isfile(
            join(image_path, image)
        )
    ]

    image = photos[randint(0, len(photos) - 1)]
    return JsonResponse({'file': image})
