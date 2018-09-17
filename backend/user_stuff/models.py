from django.db import models

class User(models.Model):
    username = models.CharField(max_length=32)
    join_date = models.DateTimeField("Date joined")
