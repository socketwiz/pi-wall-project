from django.urls import path

from . import views

app_name = 'wifi'
urlpatterns = [
    path('', views.index, name='index'),
]
