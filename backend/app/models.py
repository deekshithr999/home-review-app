from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)


class Home(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(200), unique=True, nullable=False)
    reviews = db.relationship('Review', backref='home', lazy=True)


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    image_path = db.Column(db.String(200), nullable=True)

    home_id = db.Column(db.Integer, db.ForeignKey('home.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='reviews', lazy=True)
