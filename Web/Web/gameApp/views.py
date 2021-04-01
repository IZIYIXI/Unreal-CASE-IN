from django.shortcuts import render

from django.views.generic import View, TemplateView
from .models import DataJobs
from django.http import JsonResponse

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class MainView(TemplateView):
    template_name = 'gameApp/Game1.html'

def post_json(request):
    posts = list(DataJobs.objects.values())
    return JsonResponse({'data': posts}, safe=False)


