from django.db import models
from accounts.models import User
import uuid
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.conf import settings



class Dialog(models.Model):
    """
    Class includes various relationships of a user and another user
    """
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_user      = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name="first_user")
    second_user     = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name="second_user")
    
    
    class Meta:
        unique_together = (('first_user', 'second_user'), ('second_user', 'first_user'))
        verbose_name = _("Dialog")
        verbose_name_plural = _("Dialogs")
        
    def __str__(self):
        """
        Unicode representation of Dialog MOdel.
        """
        return f"{self.first_user.username} - {self.second_user.username} dialog"
    
    @staticmethod
    def dialog_exists(first_user: User, second_user: User):
        return Dialog.objects.filter(Q(first_user=first_user, second_user=second_user) | Q(first_user=second_user, second_user=first_user)).first()

    @staticmethod
    def create_if_not_exists(first_user: User, second_user: User):
        res = Dialog.dialog_exists(first_user, second_user)
        if not res:
            Dialog.objects.create(first_user=first_user, second_user=second_user)

    @staticmethod
    def get_dialogs_for_user(user: User):
        return Dialog.objects.filter(Q(first_user=user) | Q(second_user=user)).values_list('first_user__pk', 'second_user__pk')



class UploadedFile(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uploaded_by     = models.ForeignKey(User, on_delete=models.CASCADE,related_name='uploader', db_index=True)
    file            = models.FileField(verbose_name=_("File"), blank=False, null=False, upload_to="message_files")
    upload_date     = models.DateTimeField(auto_now_add=True, verbose_name=_("Upload date"))

    def __str__(self):
        return str(self.file.name)    


class Message(models.Model):
    id          = models.BigAutoField(primary_key=True, verbose_name=_("Id"))
    sender      = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("Author"),
                               related_name='from_user', db_index=True, null=True)
    recepient   = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("Recepient"),
                                  related_name='to_user', db_index=True, null=True)
    text        = models.TextField(verbose_name=_("Text"), blank=True)
    file        = models.ForeignKey(UploadedFile, related_name='message', on_delete=models.DO_NOTHING,
                             verbose_name=_("File"), blank=True, null=True)
    dialog      = models.ForeignKey(Dialog, on_delete=models.DO_NOTHING, null=True) 
    read        = models.BooleanField(verbose_name=_("Read"), default=False)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    @staticmethod
    def get_unread_count_for_dialog_with_user(sender, recepient):
        return Message.objects.filter(sender_id=sender, recepient_id=recepient, read=False).count()


    @staticmethod
    def get_last_message_for_dialog(sender, recepient):
        return Message.objects.filter(
            Q(sender_id=sender, recepient_id=recepient) | Q(sender_id=recepient, recepient_id=sender)) \
            .select_related('sender', 'recepient').first()

    def __str__(self):
        return str(self.dialog)

    class Meta:
        # ordering = ('-created_at',)
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")


    