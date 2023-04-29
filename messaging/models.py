from django.db import models
from accounts.models import User


class RelationshipProfile(models.Model):
    """
    Class includes various relationships of a user to other users
    """
    user            = models.OneToOneField(User, on_delete=models.CASCADE)
    name            = models.CharField(max_length=100)
    relationships   = models.ManyToManyField('Relationship', related_name = "relationships", blank=True)
    
    class Meta:
        """Meta Definition for Relationship model.
        """
        verbose_name_plural = "Related Profiles"
        
    def __str__(self):
        """
        Unicode representation of RelatedUser Data.
        """
        return self.name
    
    
class Relationship(models.Model):
    """
    Class that Links Users and relationships/friendship
    """
    profile = models.OneToOneField(RelationshipProfile, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        """Meta Definition for Relationship model.
        """
        verbose_name = "Relationship Link"
        verbose_name_plural = "Relationship Links"
    
    def __str__(self):
        return f"{self.profile} Relationship Link"



class Message(models.Model):
    """
    Fields for the Message table.
    """
    message_sender      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_sender")
    message_receiver    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_receiver")
    text_message        = models.CharField(max_length=255)
    read                = models.BooleanField(default=False) 
    created_at          = models.DateTimeField(auto_now_add=True)
    updated_at          = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta Definition for Message model.
        """
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        ordering = ['created_at']
    
    def __str__(self) -> str:
        """
        Unicode representation of Message Data.
        """
        return self.text_message

class MessageMedia(models.Model):
    message_sender      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    message_receiver    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver")
    image_message       = models.ImageField(upload_to='image_messages', null=True, blank=True)
    video_message       = models.ImageField(upload_to='video_messages', null=True, blank=True)   
    read                = models.BooleanField(default=False) 
    created_at          = models.DateTimeField(auto_now_add=True)
    updated_at          = models.DateTimeField(auto_now=True) 


    class Meta:
        """Meta Definition for Message model.
        """
        verbose_name = "Message Media"
        verbose_name_plural = "Message Media"
        ordering = ['created_at']
    
    def __str__(self) -> str:
        """
        Unicode representation of Media Data.
        """
        return self.message_sender