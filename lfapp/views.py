# views.py
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import UserProfile,Item  # Import your custom user model
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.exceptions import ObjectDoesNotExist

@csrf_exempt
@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if email already exists
    if UserProfile.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already exists'}, status=400)

    # Create and save the new user
    user = UserProfile(
        email=email,
        password=make_password(password)  # Hash the password
    )
    user.save()

    return JsonResponse({'message': 'User created successfully'}, status=201)

@csrf_exempt
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(email)
    print(password)
    if not email or not password:
        return JsonResponse({"error": "Email and password are required"}, status=400)

    try:
        user = UserProfile.objects.get(email=email)
        if check_password(password, user.password):
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    
    except ObjectDoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@api_view(['POST'])
def create_item(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        location = request.POST.get('location')
        contact = request.POST.get('contact')
        image = request.FILES.get('image')

        # Check for required fields
        if not all([name, description, location, contact, image]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        # Create and save the item
        item = Item(
            name=name,
            description=description,
            location=location,
            contact=contact,
            image=image
        )
        item.save()
        return JsonResponse({'message': 'Item uploaded successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def item_list(request):
    if request.method == "GET":
        query = request.GET.get('search', '')  # Get search query
        items = Item.objects.filter(name__icontains=query)  # Filter items
        item_data = [
            {
                'name': item.name,
                'description': item.description,
                'location': item.location,
                'contact': item.contact,
                'image': item.image.url if item.image else None,
            }
            for item in items
        ]
        return JsonResponse(item_data, safe=False)
