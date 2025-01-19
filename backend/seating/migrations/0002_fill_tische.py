# seating/migrations/0002_fill_tische.py

from django.db import migrations

def erstelle_sitzplan(apps, schema_editor):
    Tisch = apps.get_model('seating', 'Tisch')
    
    # Definiere deine Tischdaten
    tische = [
        {"tisch_id": "T1", "position_x": 50, "position_y": 50, "kapazität": 4},
        {"tisch_id": "T2", "position_x": 150, "position_y": 50, "kapazität": 4},
        {"tisch_id": "T3", "position_x": 250, "position_y": 50, "kapazität": 2},
        {"tisch_id": "T4", "position_x": 50, "position_y": 150, "kapazität": 2},
        {"tisch_id": "T5", "position_x": 150, "position_y": 150, "kapazität": 4},
        {"tisch_id": "T6", "position_x": 250, "position_y": 150, "kapazität": 4},
        {"tisch_id": "T7", "position_x": 150, "position_y": 250, "kapazität": 6},
        {"tisch_id": "T8", "position_x": 250, "position_y": 250, "kapazität": 8},
    ]
    
    # Erstelle die Tische in der Datenbank
    for tisch in tische:
        Tisch.objects.create(**tisch)

class Migration(migrations.Migration):

    dependencies = [
        ('seating', '0001_initial'),  # Deine erste Migration
    ]

    operations = [
        migrations.RunPython(erstelle_sitzplan),
    ]
