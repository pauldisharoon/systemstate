from django.shortcuts import render
import psutil
from django.http import JsonResponse


def index(request):
    return render(request, 'check/index.html')

# Returns the CPU, Memory and Disk usage stats
def check(request):
    # CPU Average Load - as a simple string
    cpu = str(psutil.getloadavg())

    # Memory usage details
    memory = psutil.virtual_memory()
    mem_details = {}
    for name in memory._fields:
        mem_details[name] = getattr(memory, name)

    # Disk usage details
    disk = psutil.disk_usage('/')
    disk_details = {}
    for name in disk._fields:
        disk_details[name] = getattr(disk, name)

    info = {"cpu": cpu, "disk": disk_details, "memory": mem_details}

    return JsonResponse(info)