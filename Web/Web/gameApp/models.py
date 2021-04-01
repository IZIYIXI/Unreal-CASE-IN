from django.db import models

class DataJobs(models.Model):
    position = models.CharField(max_length= 50)
    interactionID = models.CharField(max_length= 10)
    text = models.TextField()

class Operator(models.Model):
    str = models.CharField(max_length=50)