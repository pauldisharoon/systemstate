"""system URL Configuration

"""
from django.urls import include, path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('',TemplateView.as_view(template_name = 'check/index.html')),
    # path('', views.index, name='index'),
    path('check', views.check, name='check'),
]
