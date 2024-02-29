from django.contrib import admin
from .models import *


fields = [Message, Dialog, UploadedFile]

admin.site.register(fields)

