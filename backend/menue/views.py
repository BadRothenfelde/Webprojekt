from django.shortcuts import render
from django.http import JsonResponse, FileResponse
import os


from .models import Menue
# Create your views here.

def menueList(request):
    menue = {"Haupt" : list(Menue.objects.values("id", "name", "picture", "price", "description", "allergies"))}
    return JsonResponse(menue)
def addItem(request):
    #maybe csrf
    data = request.POST
    name = data.get("name")
    price = data.get("price")
    description = data.get("description")
    allergies = data.get("allergies")

    picture = request.FILES.get("image")

    path = os.path.join("./menue/assets/", picture.name)
    try:
        with open(path, "wb") as file:
            for chunk in picture.chunks():
                file.write(chunk)       
    except:
        return JsonResponse({'message': 'error'})
    
    Menue(name=name, price=price, description=description, picture="http://127.0.0.1:8000/menue/"+picture.name+"/", allergies=allergies).save()
    return JsonResponse({'message': 'sucess'})
def removeItem(request):
    id = request.body.decode("utf-8")
    try:
        Menue.objects.get(id=id).delete()
    except:
        return JsonResponse({'message': 'Failed in removing Item'}, status=400)
    return JsonResponse({'message': 'Item removed'}, status=200)
def menuePic(request, pic_name):
    img = open("./menue/assets/"+(pic_name), "rb")
    return FileResponse(img)
