from django.db import models

# Create your models here.

class Menue(models.Model):
    name = models.CharField(max_length=20)
    picture = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.CharField(max_length=200)
    allergies = models.CharField(max_length=100)

    def __str__(self):
        return self.name