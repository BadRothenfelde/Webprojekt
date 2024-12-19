from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import Question

# Create your views here.

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    
    serialized_questions = list(latest_question_list.values("id", "question_text", "pub_date"))
    context = {
        "latest_question_list" : serialized_questions
    }
    return JsonResponse(context)



def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
