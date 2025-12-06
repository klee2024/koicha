from rest_framework import serializers
from .models import QuizQuestion, QuizOption, Quiz  

class QuizOptionSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = QuizOption
        fields = ["id", "value", "label"]

class QuizQuestionSerializer(serializers.ModelSerializer):
    options  = QuizOptionSerializer(many=True)
    class Meta: 
        model = QuizQuestion
        fields = ["id", 
                  "initial_prompt", 
                  "follow_up_prompt", 
                  "quiz", 
                  "options",
                  "order"]
        
class QuizSerializer(serializers.ModelSerializer): 
    questions = QuizQuestionSerializer(many=True)
    class Meta: 
        model = Quiz
        fields = ["id", 
                  "version", 
                  "slug", 
                  "title", 
                  "created_at", 
                  "questions"]
        
class QuizAnswerInputSerializer(serializers.Serializer): 
    # ex: [{question_id: 1, option_id: 3}, {question_id: 2, option_id: 4}]
    question_id = serializers.IntegerField()
    option_id = serializers.IntegerField()

class QuizSubmitSerializer(serializers.Serializer): 
    answers = QuizAnswerInputSerializer(many=True)

    # TODO: add validations here
    # def validate(self, data):
