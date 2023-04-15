from django.shortcuts import render
from django.views.generic import ListView, TemplateView, DeleteView, DetailView, UpdateView, CreateView


class IndexView(TemplateView):
    template_name = 'index.html'
    
