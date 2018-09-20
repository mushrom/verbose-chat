from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

def index(request):
    return HttpResponse("User profile/signup page here")

def login_view(request):
    if request.user.is_authenticated:
        return render(request, "user_stuff/login.html",
                      {"error" : "You're already logged in as " + request.user.username + "!"})

    if "username" not in request.POST:
        return render(request, "user_stuff/login.html")

    else:
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index_page:index"))

        else:
            return render(request, "user_stuff/login.html",
                         {"error" : "Invalid username or password"})

def register(request):
    print(request.POST)
    # Check for the username key in POST to check if the user has submitted
    # the form yet, and return a pristine form if they haven't.
    if "username" not in request.POST:
        return render(request, "user_stuff/register.html")

    else:
        error = None

        # Some simple input validation
        # TODO: add rate limiting, supposedly there's a django middleware
        #       thing that does this...
        # TODO: also add captcha functionality
        if len(request.POST["username"]) < 3 or len(request.POST["username"]) > 32:
            error = "Invalid username!"

        elif len(request.POST["password"]) < 6:
            error = "Password is too short!"

        elif request.POST["password"] != request.POST["password-confirm"]:
            error = "Passwords don't match!"

        elif "@" not in request.POST["email"]:
            error = "Invalid email!"

        # Attempt to find an existing user object with the given username
        # and error out if it does exist
        # TODO: check for duplicated emails too
        try:
            user = User.objects.get(username = request.POST["username"])
            error = "User already exists!"
        except (KeyError, User.DoesNotExist):
            pass

        if error:
            return render(request, "user_stuff/register.html",
                          {"error" : error })

        user = User.objects.create_user(request.POST["username"],
                                        request.POST["email"],
                                        request.POST["password"])

        return HttpResponseRedirect(reverse("user_stuff:login"))

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index_page:index"))
