from channels.db import database_sync_to_async
from accounts.models import User
from messaging.models import Dialog, Message


@database_sync_to_async
def get_dialog(uuid):
    return Dialog.objects.get(id=uuid)

@database_sync_to_async
def get_user(uuid):
    return User.objects.get(uuid=uuid)