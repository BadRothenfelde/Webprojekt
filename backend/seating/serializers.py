from rest_framework import serializers
from .models import Tisch, Buchung

# Serializer für Tisch-Details
class TischSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tisch
        fields = ['tisch_id', 'position_x', 'position_y', 'kapazität']

# Serializer für Sitzplan mit Verfügbarkeitsstatus
class SitzplanSerializer(serializers.Serializer):
    tisch = TischSerializer()
    status = serializers.CharField()  # "frei" oder "besetzt"

# Serializer für neue Buchungen
class BuchungSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buchung
        fields = ['tisch', 'datum', 'zeitfenster', 'dauer']
