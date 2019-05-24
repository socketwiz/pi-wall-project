from django.urls import path

from . import views

app_name = 'bus'
urlpatterns = [
    path('', views.index, name='index'),
    path('api/alarm/', views.alarm, name='alarm'),
    path('api/schedule/', views.BusScheduleCreate.as_view()),
    path('api/holiday/', views.BusHolidayCreate.as_view()),
]
