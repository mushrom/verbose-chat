from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "index_page/index.html")

def layout_test(request):
    return render(request, "index_page/layout_test.html")
