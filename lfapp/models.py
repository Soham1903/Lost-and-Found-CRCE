from django.db import models

class UserProfile(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)  # Store hashed passwords

    def __str__(self):
        return f"({self.email})"
    
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    contact = models.IntegerField()
    image = models.ImageField(upload_to='items/', null=True, blank=True)

    def __str__(self):
        return self.name