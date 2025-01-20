# seating/migrations/0002_fill_tische.py

from django.db import migrations

def erstelle_sitzplan(apps, schema_editor):
    Tisch = apps.get_model('seating', 'Tisch')
    
    # Definiere deine Tischdaten
    tische = [
        {"tisch_id": "T7", "position_x": 50, "position_y": 250, "kapazität": 6},
        {"tisch_id": "T8", "position_x": 150, "position_y": 250, "kapazität": 8},
    ]
    
    # Erstelle die Tische in der Datenbank
    for tisch in tische:
        Tisch.objects.update_or_create(
            tisch_id=tisch['tisch_id'],  # Überprüfen, ob der Tisch bereits existiert
            defaults=tisch  # Wenn existierend, wird dieser Datensatz mit den Werten überschrieben
        )

class Migration(migrations.Migration):

    dependencies = [
        ('seating', '0003_fill_tische'),  # Deine erste Migration
    ]

    operations = [
        migrations.RunPython(erstelle_sitzplan),
    ]
