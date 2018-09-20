from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="user_stuff"),
    path('login', views.login, name="login"),
    path('register', views.register, name="register")
]
