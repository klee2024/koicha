from django.db import models


from django.conf import settings
from django.contrib import admin

class Quiz(models.Model):
    slug = models.SlugField(default="first-time-quiz")
    version = models.IntegerField()
    title = models.CharField(max_length=100) # title of the quiz, if there are multiple quizzes post MVP
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["slug", "version"],
                name="unique_quiz_slug_version",
            )
        ]
        ordering = ["-version", "-created_at"]

    def __str__(self):
     return f"{self.title} – {self.version}"

class QuizQuestion(models.Model): 
    initial_prompt = models.CharField(max_length=250)
    follow_up_prompt = models.CharField(max_length=250)
    quiz = models.ForeignKey(
        Quiz, 
        on_delete = models.PROTECT, # if the quiz version is deleted, preserve the questions
        related_name="questions"
    )
    order = models.PositiveIntegerField(default=0) # what order the questions should be presented in
    def __str__(self):
     return f"Quiz {self.quiz.slug} v{self.quiz.version} – {self.initial_prompt}"
    
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
    
class QuizSession(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quiz_sessions",
    )
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.PROTECT,
        related_name="sessions",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"QuizSession(user={self.user}, quiz={self.quiz.slug} v{self.quiz.version})"


class QuizAnswer(models.Model):
    session = models.ForeignKey(
        QuizSession,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.PROTECT,
        related_name="answers",
    )
    option = models.ForeignKey(
        QuizOption,
        on_delete=models.PROTECT,
        related_name="answers",
    )

    def __str__(self):
        return f"Answer(session={self.session_id}, q={self.question_id}, opt={self.option_id})"
