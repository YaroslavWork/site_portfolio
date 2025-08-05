from rest_framework import serializers

from ..models import Host

class HostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ['name', 'icon_path']