from django.http import JsonResponse
from .models import Prompt
from django.views.decorators.csrf import csrf_exempt
import json
import redis

# Redis connection (safe fallback if not running)
try:
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.ping()
except:
    r = None

@csrf_exempt
def prompt_list(request):
    if request.method == "GET":
        data = list(Prompt.objects.all().values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)

        title = body.get("title")
        content = body.get("content")
        complexity = body.get("complexity")

        # Basic validation
        if not title or len(title) < 3:
            return JsonResponse({"error": "Title too short"}, status=400)

        if not content or len(content) < 20:
            return JsonResponse({"error": "Content too short"}, status=400)

        if not (1 <= int(complexity) <= 10):
            return JsonResponse({"error": "Complexity must be 1-10"}, status=400)

        prompt = Prompt.objects.create(
            title=title,
            content=content,
            complexity=complexity
        )

        return JsonResponse({"message": "Created", "id": prompt.id})


def prompt_detail(request, id):
    try:
        prompt = Prompt.objects.get(id=id)
    except Prompt.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    # Redis view count
    view_count = 0
    if r:
        key = f"prompt:{id}:views"
        view_count = r.incr(key)

    data = {
        "id": prompt.id,
        "title": prompt.title,
        "content": prompt.content,
        "complexity": prompt.complexity,
        "created_at": prompt.created_at,
        "view_count": view_count
    }

    return JsonResponse(data)