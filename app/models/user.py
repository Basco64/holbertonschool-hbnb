import uuid
from datetime import datetime

class User:
    def __init__(self, first_name, last_name, email, is_admin=False):
        if not first_name or not (0 < len(first_name) <= 50):
            raise ValueError("First name is required and must be between 1 and 50 characters.")
        if not last_name or not (0 < len(last_name) <= 50):
            raise ValueError("Last name is required and must be between 1 and 50 characters.")
        if not email:
            raise ValueError("Email is required.")

        self.uuid = str(uuid.uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.is_admin = is_admin
        self.places = []
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update_user(self, new_first_name=None, new_last_name=None, new_email=None):
        """Update user"""
        if new_first_name is not None:
            if not (0 < len(new_first_name) <= 50):
                raise ValueError("First name must be between 1 and 50 characters.")
            self.first_name = new_first_name
        if new_last_name is not None:
            if not (0 < len(new_last_name) <= 50):
                raise ValueError("Last name must be between 1 and 50 characters.")
            self.last_name = new_last_name
        if new_email is not None:
            if not new_email:
                raise ValueError("Email cannot be empty.")
            self.email = new_email
        self.updated_at = datetime.now()

    def add_place(self, place):
        """Add a place owned"""
        if not isinstance(place, Place):
            raise ValueError("Invalid Place object.")
        self.places.append(place)

    def __repr__(self):
        return f"<User uuid={self.uuid}, name={self.first_name} {self.last_name}, email={self.email}, is_admin={self.is_admin}, places={len(self.places)}>"
