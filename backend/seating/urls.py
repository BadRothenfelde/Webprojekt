from django.urls import path
from . import views

urlpatterns = [
    path('sitzplan/', views.lade_sitzplan, name='lade_sitzplan'),  # Verknüpfung mit `lade_sitzplan`-View
    path('buchung/', views.buche_tisch, name='buche_tisch'),  # Verknüpfung mit `buche_tisch`-View
]
