from django.db import models


from django.conf import settings
from django.contrib import admin

class Quiz(models.Model):
    version = models.IntegerField()
    title = models.CharField(max_length=100) # title of the quiz, if there are multiple quizzes post MVP
    created_at = models.TimeField(auto_now_add=True)
    def __str__(self):
     return f"{self.title} – {self.version}"

class QuizQuestion(models.Model): 
    initial_prompt = models.CharField(max_length=250)
    follow_up_prompt = models.CharField(max_length=250)
    quiz_version = models.ForeignKey(
        Quiz, 
        on_delete = models.PROTECT, # if the quiz version is deleted, preserve the questions
        related_name="questions"
    )
    def __str__(self):
     return f"Quiz v{self.version} – {self.initial_prompt}"
    
class QuizOption(models.Model): 
    value = models.CharField(max_length=250) # the value of the answer 
    label = models.CharField(max_length=250) # quiz question answer
    question = models.ForeignKey(
        QuizQuestion, 
        on_delete = models.CASCADE, # if the question is deleted, delete all related options
        related_name="options"
    )
    def __str__(self):
     return f"Option {self.label} – {self.value}"
    



