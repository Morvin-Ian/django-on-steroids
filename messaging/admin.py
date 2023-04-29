from django.contrib import admin
from .models import *


@admin.register(Message)
class MessageRegistration(admin.ModelAdmin):
    list_display = (
        'message_sender',
        'message_receiver',
        'text_message', 
        )  # Fields to be displayed in the list view
    
    list_filter = (
            'text_message', 
            'message_sender'
            ) # Filters to be displayed in the right sidebar
    
    search_fields = ['text_message']  # Fields to be searched
    date_hierarchy = 'created_at'  # Date-based drilldown navigation by year/month/date


related_classes = [Relationship, RelationshipProfile, MessageMedia]

admin.site.register(related_classes)