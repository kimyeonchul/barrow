# Generated by Django 4.1.3 on 2022-11-29 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_account', '0006_alter_user_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address_detail',
            field=models.CharField(default='', max_length=100),
        ),
    ]
