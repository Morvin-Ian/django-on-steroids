from django.db import models
from django.contrib.auth.models import User



class Message(models.Model):
    message_sender      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_sender")
    message_receiver    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_receiver")
    text_message        = models.CharField(max_length=255)
    image_message       = models.ImageField(upload_to='image_messages', null=True, blank=True)
    video_message       = models.ImageField(upload_to='video_messages', null=True, blank=True)
    created_at          = models.DateTimeField(auto_now_add=True)
    updated_at          = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
    
    def __str__(self) -> str:
        return self.text_message.split(' ')[0]
    