"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign-up', methods=['POST'])
def sign_up():
    print("hi")
    body = request.json
    name = body.get("name", None)
    email = body.get("email", None)
    password = body.get("password", None)

    if name is None or name.strip() == "" or email is None or email.strip() == "" or password is None or password.strip() == "":
        return jsonify("All credentials are required")
    else: 
        user = User()
        user_exists = user.query.filter_by(email = email).one_or_none()
        if user_exists is not None:
            return jsonify("User already exists")
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            hashed_password = generate_password_hash(f'{password}{salt}')
            user.name = name
            user.email = email
            user.password = hashed_password
            user.salt = salt

            db.session.add(user)
            try:
                db.session.commit()
                return jsonify('User created'), 201
            except Exception as error:
                print(error.args)
                return jsonify('Error'), 500

@api.route('/log-in', methods=['POST'])
def sign_in():
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    if email is None or password is None:
        return jsonify('Email and password keys are required'), 400
    if email.strip() == "" or password.strip() == "":
        return jsonify('All credentials are required'), 400

    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify('User does not exist'), 404
    else:
        try:
            if check_password_hash(user.password, f'{password}{user.salt}'):
                token = create_access_token(identity = str(user.id))
                return jsonify({"token": token, "current_user": user.serialize()}), 200
            else:
                return jsonify("Incorrect credentials"), 404
        except Exception as error:
            print(error.args)
            return jsonify('Error'), 500
        
@api.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    body = request.json

    task = Task()

    task.title = body.get('title', None)
    task.description = body.get('description', None)
    task.user_id = int(get_jwt_identity())
    task.completed = False
    
    if body['title'] is None or body['description'] is None:
        return jsonify("Title and description are required")
    
    db.session.add(task)
    try:
        db.session.commit()
        return jsonify("Task added")
    except Exception as error:
        return jsonify("error")

@api.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def edit_task(id):
    body = request.json

    title = body.get('title', None)
    description = body.get('description', None)
    task = Task()
    task_exists = task.query.filter(Task.user_id == int(get_jwt_identity()), Task.id == id).one_or_none()
    print(task_exists)

    task.title = body.get('title', None)
    task.description = description
    try:
        db.session.commit()
        return jsonify()
    except Exception as error:
        return False