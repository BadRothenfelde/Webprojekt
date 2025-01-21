from django.shortcuts import render
from django.http import JsonResponse, FileResponse
import os


from .models import Menue
# Create your views here.

def menueList(request):
    menue = {"Haupt" : list(Menue.objects.values("id", "name", "picture", "price", "description", "allergies"))}
    return JsonResponse(menue)

def adjustMenu(request):
    data = request.POST

    menu = Menue.objects.get(id = data.get("id"))
    
    if(data.get("name") != "undefined"):
        menu.name  =  data.get("name")
    if data.get("price") != "undefined":
        menu.price = data.get("price")
    if data.get("description") != "undefined":
        menu.description =  data.get("description")
    if data.get("allergies") != "undefined":
        menu.allergies = data.get("allergies")

    picture = request.FILES.get("image") if request.FILES.get("image") else None
    if(picture != None):
        if(picture.name != menu.picture):
            path = os.path.join("./administration/assets/", picture.name)
            try:
                with open(path, "wb") as file:
                    for chunk in picture.chunks():
                        file.write(chunk)       
            except:
                return JsonResponse({'message': 'error'}, status=404)
            menu.picture = picture.name

    menu.save()
    return JsonResponse({'message': 'sucess'})
def addItem(request):
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
    return JsonResponse({'message': 'sucess'}, status=200)

def removeItem(request):
    id = request.body
    try:
        Menue.objects.get(id=id).delete()
    except:
        return JsonResponse({'message': 'Failed in removing Item'}, status=400)
    return JsonResponse({'message': 'Item removed'}, status=200)

def menuePic(request, pic_name):
    img = open("./menue/assets/"+(pic_name), "rb")
    return FileResponse(img)
