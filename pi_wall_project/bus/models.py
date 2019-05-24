from django.db import models


class Schedule(models.Model):
    pickup = models.TimeField(blank=False)

    def __str__(self):
        return '%s' % (self.pickup)


class Holiday(models.Model):
    begin = models.DateField(blank=False)
    end = models.DateField(blank=False)

    def __str__(self):
        return '%s - %s' % (self.begin, self.end)
