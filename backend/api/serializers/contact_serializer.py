from rest_framework import serializers

from ..models.contact import Contact

class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for Contact model.
    """

    class Meta:
        model = Contact
        fields = ['identification', 'icon_name']