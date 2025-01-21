from django import forms
from .models import Buchung  # Importiere das Modell Buchung

class BuchungForm(forms.ModelForm):
    class Meta:
        model = Buchung
        fields = ['tisch', 'datum', 'zeitfenster', 'dauer']  # Hier kannst du anpassen, welche Felder angezeigt werden sollen
