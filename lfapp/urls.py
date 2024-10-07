from django.urls import path
from .views import signup, login, create_item, item_list

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('upload/', create_item, name='create_item'),
    path('items/', item_list, name='item_list'),
]

