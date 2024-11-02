from flask import Flask
from app.config import Config

def create_app():
    flask_app = Flask(__name__)
    flask_app.config.from_object(Config)

    from app.routes import api
    flask_app.register_blueprint(api,url_prefix='/api')
    
    return flask_app