# Generated by Django 3.1.4 on 2020-12-31 23:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201231_2344'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='value',
            new_name='label',
        ),
    ]
