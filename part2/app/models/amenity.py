import uuid
from datetime import datetime


class Amenity:
    def __init__(self, name):
        self.is_valid_length(name, 1, 50)

        self.uuid = str(uuid.uuid4())
        self.name = name
        self.places = []
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update(self, data):
        """Update name."""
        self.is_valid_length(data["name"], 1, 50)

        for key, value in data.items():
            if hasattr(self, key):
                setattr(self, key, value)

        self.updated_at = datetime.now()

    def __repr__(self):
        return f"<Amenity id={self.uuid}, name={self.name}, created_at={self.created_at}, updated_at={self.updated_at}>"

    def is_valid_length(self, input, min, max):
        """Check the length of the input."""
        if not (min <= len(input) <= max):
            raise ValueError(f"{input} be between {min} and {max} characters.")
