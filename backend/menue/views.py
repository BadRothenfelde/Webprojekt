from django.shortcuts import render
from django.http import JsonResponse, FileResponse


from .models import Menue
# Create your views here.

def menueList(request):
    menue = {"Haupt" : list(Menue.objects.values("id", "name", "picture", "price", "description", "allergies"))}
    return JsonResponse(menue)

def menuePic(request, pic_name):
    img = open("./menue/assets/"+(pic_name), "rb")
    return FileResponse(img)
