from django.urls import path
# TODO: remove this in production!
from django.conf import settings

from . import views

app_name = "index_page"
urlpatterns = [
    path('', views.index, name='index'),
    path('layout_test', views.layout_test, name='layout_test'),
]
