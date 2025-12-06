from django.urls import path
from .views import LatestQuizView, SubmitQuizAnswers

urlpatterns = [
    path("<slug:quiz_slug>/latest/", 
         LatestQuizView.as_view(), 
         name="quiz-latest"), 
    path("<slug:quiz_slug>/latest/submit/", 
         SubmitQuizAnswers.as_view(), 
         name="submit-quiz")
]

