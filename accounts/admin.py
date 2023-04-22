from django.contrib import admin
from .models import User

@admin.register(User)
class UserRegistration(admin.ModelAdmin):
    list_display = (
        'email',
        'username',
        'is_staff',
        'is_active',
        'uuid',
        'email_verified'
    )

    list_filter =['email']
    date_hierarchy = ('date_joined')
    search_fields = ['email', 'username']
