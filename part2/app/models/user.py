import uuid
from datetime import datetime
from email_validator import validate_email, EmailNotValidError


class User:
    """Represent an user."""

    def __init__(self, first_name, last_name, email, is_admin=False):
        """Initialize a User instance."""
        self.is_valid_length(first_name, 1, 50)
        self.is_valid_length(last_name, 1, 50)
        valid_email = self.check_mail(email)

        self.uuid = str(uuid.uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.email = valid_email
        self.is_admin = is_admin
        self.places = []
        self.reviews = []
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update(self, data):
        """Update user."""
        if data["first_name"] is not None:
            self.is_valid_length(data["first_name"], 1, 50)
        if data["last_name"] is not None:
            self.is_valid_length(data["last_name"], 1, 50)

        if data["email"] is not None:
            valid_new_email = self.check_mail(data["email"])
            data["email"] = valid_new_email

        for key, value in data.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.updated_at = datetime.now()

    def add_place(self, place):
        """Add a place owned."""
        self.places.append(place)

    def add_review(self, review):
        """Add a review."""
        self.reviews.append(review)

    def delete_review(self, review):
        """Remove a review."""
        self.reviews.remove(review)

    def __repr__(self):
        """Represent formated values of attributes."""
        return f"<User uuid={self.uuid}, \
            name={self.first_name} {self.last_name}, \
            email={self.email}, is_admin={self.is_admin}, \
            places={len(self.places)}>"

    def is_valid_length(self, input, min, max):
        """Check the length of the input."""
        if not (min <= len(input) <= max) or input is None:
            raise ValueError(f"{input} must be between {min} and {max} characters.")

    def check_mail(self, email):
        """Check the validity of the mail."""
        if not email:
            raise ValueError("Email is required")
        try:
            validated_email = validate_email(email)
            email = validated_email.email
            return email
        except EmailNotValidError as e:
            raise ValueError(f"{str(e)}")
