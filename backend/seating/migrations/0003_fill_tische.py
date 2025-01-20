# seating/migrations/0002_fill_tische.py

from django.db import migrations

def erstelle_sitzplan(apps, schema_editor):
    Tisch = apps.get_model('seating', 'Tisch')
    
    # Definiere deine Tischdaten
    tische = [
        {"tisch_id": "T9", "position_x": 250, "position_y": 250, "kapazität": 8},
    ]
    
    # Erstelle die Tische in der Datenbank
    for tisch in tische:
        Tisch.objects.create(**tisch)

class Migration(migrations.Migration):

    dependencies = [
        ('seating', '0002_fill_tische'),  # Deine erste Migration
    ]

    operations = [
        migrations.RunPython(erstelle_sitzplan),
    ]
