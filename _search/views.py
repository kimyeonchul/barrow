from django.shortcuts import render
from .forms import KeywordForm
from .models import Keyword
from _account.models import User

def search(request):
    # user = request.user
    user = User.objects.get(id = 2)

    keyword = Keyword.objects.filter(content = request.POST.get('content'))
    if keyword:
        keyword[0].searched()
        if not keyword[0].search.filter(id = user.id):
            keyword[0].search.add(user)

        keyword[0].save()
    else:
        form = KeywordForm(request.POST)
        if form.is_valid():
            new = form.save(commit = False)
            new.search.add(user)
            new.searched()
            new.save()    
        
    return render(request, 'test.html')
