from django.urls import path

from . import views
from .views import MainView, post_json

urlpatterns = [


    path('', MainView.as_view(), name ='main-view' ),
    path('posts-json', post_json, name ='posts-json-view' ),

]