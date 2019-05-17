from django.urls import path

from . import views

app_name = 'bus'
urlpatterns = [
    path('', views.index, name='index'),
]
