from django.test import TestCase
from .models import *

class MessageModelTest(TestCase):
    def test_message_model_existence(self):
        messages = Message.objects.count()

        self.assertEqual(messages,0)