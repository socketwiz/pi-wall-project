from rest_framework import serializers
from .models import Holiday, Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id', 'pickup')


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ('id', 'begin', 'end')
