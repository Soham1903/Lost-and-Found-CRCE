from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.hashers import make_password 

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['email', 'password']

    def create(self, validated_data):
        # Password hashing (important for security)
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)