from django.urls import path
# TODO: remove this in production!
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
