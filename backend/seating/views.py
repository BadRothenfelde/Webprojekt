from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tisch, Buchung
from .serializers import TischSerializer, SitzplanSerializer, BuchungSerializer
from datetime import timedelta, time

# API-View: Sitzplan mit Verfügbarkeitsstatus
@api_view(['GET'])
def lade_sitzplan(request):
    datum = request.query_params.get('datum')
    zeitfenster = request.query_params.get('zeitfenster')  # Zeit als String "HH:MM"
    if not datum or not zeitfenster:
        return Response({"error": "Datum und Zeitfenster sind erforderlich."}, status=400)

    zeitfenster = time.fromisoformat(zeitfenster)
    tische = Tisch.objects.all()
    buchungen = Buchung.objects.filter(datum=datum)

    # Bereite Sitzplan mit Status auf
    sitzplan = []
    for tisch in tische:
        besetzt = buchungen.filter(tisch=tisch, zeitfenster=zeitfenster).exists()
        sitzplan.append({"tisch": TischSerializer(tisch).data, "status": "besetzt" if besetzt else "frei"})
    
    return Response(sitzplan, status=200)

# API-View: Buchung eines Tisches
@api_view(['POST'])
def buche_tisch(request):
    serializer = BuchungSerializer(data=request.data)
    if serializer.is_valid():
        tisch_id = serializer.validated_data['tisch'].id
        datum = serializer.validated_data['datum']
        zeitfenster = serializer.validated_data['zeitfenster']

        # Verfügbarkeit prüfen
        if Buchung.objects.filter(tisch_id=tisch_id, datum=datum, zeitfenster=zeitfenster).exists():
            return Response({"error": "Dieser Tisch ist bereits belegt."}, status=400)

        # Buchung speichern
        serializer.save()
        return Response({"message": "Buchung erfolgreich!"}, status=201)
    return Response(serializer.errors, status=400)
