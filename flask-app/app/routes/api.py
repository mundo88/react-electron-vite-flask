from flask import Blueprint

api = Blueprint('api', __name__)

@api.route('/version')
def version():
    return '1.0'
@api.route('/hello')
def hello():
    return 'Hello World!'