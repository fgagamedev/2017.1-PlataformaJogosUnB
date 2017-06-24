from information.models import Rating, Information, Genre
from information.serializers import GenreSerializer
from rest_framework.decorators import APIView
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class VoteView(APIView):

    permission_classes = (permissions.AllowAny, )

    def post(self, request, pk=None):
        user_voter = str(request.user)
        information = get_object_or_404(Information, pk=pk)
        try:
            rating = Rating.objects.get(
                user_voter=user_voter)
            rating.delete()
        except BaseException:
            rating = None

        rating = Rating(vote=request.data['vote'],
                        user_voter=user_voter,
                        information=information)
        try:
            rating.save()
#            logout(request)
            return Response({'status': 'Vote successfully done.'},
                            status.HTTP_201_CREATED,
                            template_name="game/index.html")
        except BaseException:
            return Response({'status': 'The vote could not be done.'},
                            status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        information = get_object_or_404(Information, pk=pk)
        vote_count = {}
        vote_count['likes'] = information.likes
        vote_count['dislikes'] = information.dislikes

        return Response(vote_count)


class GenreViewList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_class = (permissions.AllowAny)
