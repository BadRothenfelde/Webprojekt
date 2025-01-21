from django.shortcuts import render
from django.http import JsonResponse, FileResponse, HttpResponse
from django.middleware.csrf import get_token
import json, os, hashlib
from django.contrib.auth.hashers import check_password

# Create your views here.
from menue.models import Menue
from .models import User

#from django.views.decorators.csrf import csrf_exempt
#@csrf_exempt
def verify(request):
    verify = json.loads(request.body)
    try:
        user = User.objects.values("id", "name", "surname", "picture", "description", "lvl").get(name=verify.get("name"))
        
        # if(check_password(verify.get("password"), user.password)):
        if(hashlib.sha512(verify.get("password").encode()).hexdigest() == User.objects.values("password").get(name=verify.get("name")).get("password")):
            return JsonResponse(user, status=200)
        else:
            return JsonResponse({'error': "Invalid Password"}, status=401)
    except User.DoesNotExist:
        return JsonResponse({'error': "Invalid Username"}, status=401)
#@csrf_exempt
#def set_csrf_token(request):
#    token = get_token(request)  # Ensures the CSRF token is created
#    return JsonResponse({'csrfToken': token})
  
def users(request):
    logReq = json.loads(request.body)
    # maybe Verification + Log
    return JsonResponse({"user": list(User.objects.values("id", "name", "surname", "picture", "description", "lvl"))})    

def profilePic(request, pic_name):
    img = open("./administration/assets/"+(pic_name), "rb")
    return FileResponse(img)

def addUser(request):
    #maybe csrf
    data = request.POST
    name = data.get("vorname")
    surname = data.get("nachname")
    password = hashlib.sha512(data.get("password").encode()).hexdigest()
    description = data.get("beschreibung")
    lvl = data.get("lvl")

    
    picture = request.FILES.get("profilePicture") if request.FILES.get("profilePicture") else None
    if(picture != None):     
        path = os.path.join("./administration/assets/", picture.name)
        try:
            with open(path, "wb") as file:
                for chunk in picture.chunks():
                    file.write(chunk)       
        except:
            return JsonResponse({'message': 'error'}, status=404)
        pictureName = "http://127.0.0.1:8000/administration/"+picture.name+"/"
    else:
        pictureName = "http://127.0.0.1:8000/administration/none.png/"
    User(name=name, surname=surname, password=password, description=description, picture=pictureName, lvl=lvl).save()
    return JsonResponse({'message': 'sucess'})

def adjustUser(request):
    #maybe csrf
    data = request.POST

    user = User.objects.get(id = data.get("id"))
    
    if(data.get("vorname") != "undefined"):
        user.name  =  data.get("vorname")
    if data.get("nachname") != "undefined":
        user.surname = data.get("nachname")
    if data.get("password") != "undefined":
        user.password = hashlib.sha512(data.get("password").encode()).hexdigest()
    if data.get("beschreibung") != "undefined":
        user.description = data.get("beschreibung")
    if data.get("lvl") != "undefined":
        user.lvl = data.get("lvl")

    picture = request.FILES.get("profilePicture") if request.FILES.get("profilePicture") else None
    if(picture != None):
        if(picture.name != user.picture):
            path = os.path.join("./administration/assets/", picture.name)
            try:
                with open(path, "wb") as file:
                    for chunk in picture.chunks():
                        file.write(chunk)       
            except:
                return JsonResponse({'message': 'error'}, status=404)
            user.picture = picture.name

    user.save()
    return JsonResponse({'message': 'sucess'})

def removeUser(request):
    id = request.body
    try:
        User.objects.get(id=id).delete()
    except:
        return JsonResponse({'message': 'Failed in removing Item'}, status=400)
    return JsonResponse({'message': 'Item removed'}, status=200)
def changePic(request, pic_name):
    img = open("./menue/assets/"+(pic_name), "rb")
    return FileResponse(img)