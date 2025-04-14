from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def hello_view(request):
    return Response({'message': 'Привет из Django API!'}, status=status.HTTP_200_OK)
