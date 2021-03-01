from django.shortcuts import render
from .models import Recent

# Create your views here.


def index(request):
    return render(request, 'core/index.html', {})


def recent(request):
    recent_songs = Recent.objects.all()
    return render(request, 'core/recents.html', {'recent_songs': recent_songs})
