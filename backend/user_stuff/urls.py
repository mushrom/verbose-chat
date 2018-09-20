from django.urls import path
from . import views

app_name = "user_stuff"
urlpatterns = [
    path('', views.index, name="user_stuff"),
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.register, name="register")
]
