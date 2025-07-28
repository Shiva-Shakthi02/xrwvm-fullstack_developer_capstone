# Uncomment the following imports before adding the Model code

from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

# Car Make Model
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=100, default='Unknown')  # Optional extra field

    def __str__(self):
        return f"{self.name} - {self.description[:30]}"  # Shows partial description

# Car Model
class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)  # Many-to-One
    name = models.CharField(max_length=100)

    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('TRUCK', 'Truck'),
        ('VAN', 'Van'),
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(
        default=2023,
        validators=[
            MinValueValidator(2015),
            MaxValueValidator(2023)
        ]
    )
    created_on = models.DateTimeField(default=now)  # Optional timestamp

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.type}, {self.year})"
