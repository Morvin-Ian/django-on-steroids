# Generated by Django 4.2 on 2023-04-16 05:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['created_at'], 'verbose_name': 'Message', 'verbose_name_plural': 'Messages'},
        ),
    ]
