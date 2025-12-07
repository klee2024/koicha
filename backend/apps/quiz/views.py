from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny  # or AllowAny for public quizzes
from .models import Quiz, QuizAnswer, QuizOption, QuizQuestion, QuizSession
from .serializers import QuizSerializer, QuizSubmitSerializer

class LatestQuizView(APIView): 
    """
    GET /api/quiz/<quiz_slug>/latest
    Returns all questions (with options) for the slug's latest quiz version.
    """
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated] AUTH implemented 

    def get(self, request, quiz_slug):
        latest_quiz = (
            Quiz.objects.filter(slug=quiz_slug)
            .order_by("-version")
            .prefetch_related("questions__options") # populate all associated questions and options
            .first()
        )

        if not latest_quiz: 
            return Response({"detail": "Quiz not found"}, status=404)
        
        serializer = QuizSerializer(latest_quiz)
        return Response(serializer.data)
     
class SubmitQuizAnswers(APIView): 
    """
    POST /api/quiz/<quiz_slug>/latest/submit/
    Creates quiz session for the user with their answers
    Body: { "answers": [ { "question_id": ..., "option_id": ... }, ... ] }
    """

    # create a quiz session object for the user
    # create all the quiz answers based on the input object 

    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_slug):
        # 1. find the latest quiz
        latest_quiz = (
                Quiz.objects.filter(slug=quiz_slug)
                .order_by("-version")
                .first()
            )
        if latest_quiz is None:
            return Response({"detail": "Quiz not found."}, status=status.HTTP_404_NOT_FOUND)

        # 2. validate payload 
        serializer = QuizSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answers_data = serializer.validated_data["answers"]

        # 3. Create a session
        session = QuizSession.objects.create(
            user=request.user,
            quiz=latest_quiz
        )

        # 4. store answers
        for answer in answers_data: 
            question_id = answer["question_id"]
            option_id = answer["answer_id"]
            try:
                question = QuizQuestion.objects.get(id=question_id, quiz=latest_quiz)
                option = QuizOption.objects.get(id=option_id, question=question)
            except (QuizQuestion.DoesNotExist, QuizOption.DoesNotExist):
                return Response(
                    {"detail": "Invalid question/option pairing."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            QuizAnswer.objects.create(
                session=session, 
                question=question, 
                option=option
            )
        
        # 5. TODO: If first-time-quiz, update the taste profile
        return Response({"detail": "Quiz submitted."}, status=status.HTTP_201_CREATED)
 


        