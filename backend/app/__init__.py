from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import OperationalError

from flask_cors import CORS

import time
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    import os
    if not os.path.exists('app/uploads'):
        os.makedirs('app/uploads')

    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////app/data/homes_data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = 'app/uploads'

    db.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    with app.app_context():
        for i in range(5):
            try:
                db.create_all()
                break
            except OperationalError:
                print("Database not ready, waiting...")
                time.sleep(3)

    return app
