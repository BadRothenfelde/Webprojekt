from django.urls import path

from . import views

urlpatterns = [
    #Hauptspeise Menü Liste
    path("", views.verify, name="Verifizierung"),
#    path("verify/", views.set_csrf_token, name="Cross Site"),
    path("users/", views.users, name="Nutzer")
]