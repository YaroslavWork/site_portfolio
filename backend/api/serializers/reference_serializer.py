from rest_framework import serializers

from ..models import Reference
from .host_serializer import HostSerializer

class ReferenceSerializer(serializers.ModelSerializer):

    host = HostSerializer(many=False, read_only=True)

    class Meta:
        model = Reference
        fields = ['host', 'url']
        extra_kwargs = {
            'url': {'required': True, 'allow_blank': False}
        }