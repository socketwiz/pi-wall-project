from django.urls import path

from . import views

app_name = 'bus'
urlpatterns = [
    path('', views.index, name='index'),
    path('next_image/', views.next_image, name='next_image'),
]
