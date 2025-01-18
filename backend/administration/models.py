from django.db import models

# Create your models here.

class User(models.Model):
    class Access(models.IntegerChoices):
        guest = 0
        customer = 1
        admin = 2
        master = 3

    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    
    picture = models.CharField(max_length=50)
    password = models.CharField(max_length=512)
    description = models.CharField(max_length=200)
    lvl = models.IntegerField(choices=Access.choices, default=Access.guest)

    def __str__(self):
        return self.name