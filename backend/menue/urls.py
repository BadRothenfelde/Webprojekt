from django.urls import path

from . import views

urlpatterns = [
    #Hauptspeise Menü Liste
    path("", views.menueList, name="Hauptspeisen"),
    path("<pic_name>/", views.menuePic, name="MenuBild")
]