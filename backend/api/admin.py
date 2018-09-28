from django.contrib import admin
from .models import VerbMessage, VerbChannel, VerbServer

admin.site.register(VerbMessage)
admin.site.register(VerbChannel)
admin.site.register(VerbServer)
