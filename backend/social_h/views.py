from django.http import HttpResponse
from django.template import loader


def hello_world(request):
    template = loader.get_template("hello_world.html")
    return HttpResponse(template.render())
