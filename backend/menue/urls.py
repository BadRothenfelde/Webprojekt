from django.urls import path

from . import views

urlpatterns = [
    #Hauptspeise Menü Liste
    path("", views.menueList, name="Hauptspeisen"),
    path("newItem/", views.addItem, name="Neue Speise"),
    path("removeItem/", views.removeItem, name="Vergessene Speise"),
    path("adjustMenu/", views.adjustMenu, name="Anpassung der Menüdaten"),
    path("<pic_name>/", views.menuePic, name="MenuBild")
]