from django.http import JsonResponse
from django.shortcuts import render
from .models import Holiday, Schedule
from .serializers import HolidaySerializer, ScheduleSerializer
from rest_framework import generics


import os, pyaudio, _thread, wave


def play_sound():
    alarm = 'school-bell.wav'
    chunk = 1024

    try:
        sound = wave.open('bus/media/%s' % alarm, 'rb')
    except FileNotFoundError:
        print('%s/bus/media/%s not found' % (os.getcwd(), alarm))
    else:
        pa = pyaudio.PyAudio()
        stream = pa.open(format = pa.get_format_from_width(sound.getsampwidth()),
                        channels = sound.getnchannels(),
                        rate = sound.getframerate(),
                        output = True)
        data = sound.readframes(chunk)

        while data:
            stream.write(data)
            data = sound.readframes(chunk)

        stream.stop_stream()
        stream.close()

        pa.terminate()



def index(request):
    return render(request, 'bus/index.html')


def alarm(request):
    _thread.start_new_thread(play_sound, ())

    return JsonResponse({'msg': 'alarm sounding'})


class BusScheduleCreate(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


class BusHolidayCreate(generics.ListCreateAPIView):
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
