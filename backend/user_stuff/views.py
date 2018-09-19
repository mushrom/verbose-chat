from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("User profile/signup page here")

def login(request):
    return render(request, "user_stuff/login.html")
