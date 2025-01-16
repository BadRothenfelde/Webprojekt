from django.shortcuts import render
from django.http import JsonResponse, FileResponse, HttpResponse
from django.middleware.csrf import get_token
import json
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
        if(verify.get("password") == User.objects.values("password").get(name=verify.get("name")).get("password")):
            return JsonResponse(user)
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
    print( get_token(request))
    # maybe Verification + Log
    return JsonResponse({"user": list(User.objects.values("id", "name", "surname", "picture", "description", "lvl"))})    

def changePic(request, pic_name):
    img = open("./menue/assets/"+(pic_name), "rb")
    return FileResponse(img)