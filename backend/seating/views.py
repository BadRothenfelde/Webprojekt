from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tisch, Buchung
from .serializers import TischSerializer, SitzplanSerializer, BuchungSerializer
from datetime import timedelta, time
from django.http import JsonResponse
from .forms import BuchungForm
from seating.forms import BuchungForm
import json
import random
from datetime import datetime, timedelta


def lade_sitzplan(request):
    datum = request.GET.get('datum')
    zeitfenster = request.GET.get('zeitfenster')  # Zeit als String "HH:MM"
    if not datum or not zeitfenster:
        return Response({"error": "Datum und Zeitfenster sind erforderlich."}, status=400)

    zeitfenster = time.fromisoformat(zeitfenster)
    tische = Tisch.objects.all()
    buchungen = Buchung.objects.filter(datum=datum)



    sitzplan = []
    for tisch in tische:
        # Berechne die Endzeit der Buchung anhand der Dauer
        for buchung in buchungen.filter(tisch=tisch):
            buchungs_endzeit = datetime.combine(datetime.strptime(datum, '%Y-%m-%d').date(), buchung.zeitfenster) + timedelta(minutes=buchung.dauer)
            buchungs_startzeit = datetime.combine(datetime.strptime(datum, '%Y-%m-%d').date(), buchung.zeitfenster)
            jetzige_zeit = datetime.combine(datetime.strptime(datum, '%Y-%m-%d').date(), zeitfenster)
            
            # Wenn der Tisch für die angefragte Zeit und die Dauer schon gebucht ist
            if buchungs_startzeit <= jetzige_zeit < buchungs_endzeit:
                sitzplan.append({"tisch": TischSerializer(tisch).data, "status": "besetzt"})
                break
        else:
            sitzplan.append({"tisch": TischSerializer(tisch).data, "status": "frei"})
    
    return JsonResponse({"Sitzplan": list(sitzplan)}, status=200)

def generate_unique_code():
    # Generiere einen zufälligen 6-stelligen Code
    while True:
        code = str(random.randint(100000, 999999))
        # Überprüfe, ob der Code bereits existiert
        if not Buchung.objects.filter(buchungscode=code).exists():
            return code

def buche_tisch(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)  # Parse die JSON-Daten
            print(body)  # Debugging

            zeitfenster = body.get('zeitfenster')
            zeitfenster_obj = time.fromisoformat(zeitfenster)
            if not (time(10, 0) <= zeitfenster_obj <= time(21, 30)):
                return JsonResponse({"error": "Das Zeitfenster muss zwischen 10:00 und 21:30 liegen."}, status=400)

            # Siehe hier, wie du das FormData übergibst
            # Da du `tisch_id` verwendest, solltest du den Wert in die ForeignKey-Relation auflösen:
            tisch = get_object_or_404(Tisch, tisch_id=body['tisch'])  # Suche den Tisch anhand seiner ID
            datum = body['datum']
            zeitfenster = body['zeitfenster']
            dauer = body['dauer']

            # Prüfe Verfügbarkeit
            if Buchung.objects.filter(tisch=tisch, datum=datum, zeitfenster=zeitfenster).exists():
                return JsonResponse({"error": "Dieser Tisch ist bereits belegt."}, status=400)

            # Generiere einen einzigartigen 6-stelligen Buchungscode
            buchungscode = generate_unique_code()

            # Buchung erstellen und speichern
            buchung = Buchung.objects.create(tisch=tisch, datum=datum, zeitfenster=zeitfenster, dauer=dauer,buchungscode=buchungscode)
            buchung.save()

            print(f"Generierter Buchungscode: {buchungscode}") 
            return JsonResponse({"message": "Buchung erfolgreich!", "buchungscode": buchungscode}, status=201)


        except json.JSONDecodeError:
            return JsonResponse({"error": "Fehler beim Parsen der JSON-Daten."}, status=400)
        
    return JsonResponse({"error": "Ungültige Anfrage"}, status=400)

def reservations(request):
    return JsonResponse({"reservation": list(Buchung.objects.values("id", "tisch", "datum", "zeitfenster", "dauer", "buchungscode"))})
def adjustUser(request):
    #maybe csrf
    data = request.POST
    
    reservation = Buchung.objects.get(id = data.get("id"))
    
    if(data.get("tisch") != "undefined"):
        reservation.tisch = Tisch.objects.get(id=data.get("tisch"))
    if data.get("datum") != "undefined":
        reservation.datum = data.get("datum")
    if data.get("zeitfenster") != "undefined":
        reservation.zeitfenster = data.get("zeitfenster")
    if data.get("dauer") != "undefined":
        reservation.dauer = data.get("dauer")

    reservation.save()
    return JsonResponse({'message': 'sucess'})

def removeUser(request): 
    id = request.body
    try:
        Buchung.objects.get(id=id).delete()
    except:
        return JsonResponse({'message': 'Failed in removing Item'}, status=400)
    return JsonResponse({'message': 'Item removed'}, status=200)