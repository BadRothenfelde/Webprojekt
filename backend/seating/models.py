from django.db import models

# Tabelle für Tische
class Tisch(models.Model):
    tisch_id = models.CharField(max_length=10, unique=True)  # z.B. "T1", "T2"
    position_x = models.IntegerField()  # x-Koordinate für Sitzplan
    position_y = models.IntegerField()  # y-Koordinate für Sitzplan
    kapazität = models.IntegerField()  # Anzahl der Sitzplätze

    def __str__(self):
        return self.tisch_id

# Tabelle für Buchungen
class Buchung(models.Model):
    tisch = models.ForeignKey(Tisch, on_delete=models.CASCADE)  # Verknüpfung zu einem Tisch
    datum = models.DateField()  # Reservierungsdatum
    zeitfenster = models.TimeField()  # Beginn der Reservierung
    dauer = models.IntegerField()  # Dauer in Minuten

    def __str__(self):
        return f"Buchung: {self.tisch.tisch_id} - {self.datum} {self.zeitfenster}"
