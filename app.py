import os
import dotenv
from flask import Flask, redirect, url_for, render_template, request, Response, abort
import mysql.connector
import time
import mimetypes


import utils.db
import utils.auth



dotenv.load_dotenv()

mimetypes.add_type('application/javascript', '.js')

MYSQL_UP = True
db  = None
db_cursor = None


app = Flask(__name__, static_folder = 'public')


@app.before_first_request
def init_db():
    global db, db_cursor, MYSQL_UP
    try:
        db = mysql.connector.connect(
            host = os.environ.get('DB_HOST'),
            user = os.environ.get('DB_USER'),
            password = os.environ.get('DB_PASSWORD'),
            database = os.environ.get('DB_NAME')
        )

        db_cursor = db.cursor(buffered = True)

        utils.db.check_db_integrity(db_cursor)
    except mysql.connector.Error as e:
        print(e)
        MYSQL_UP = False

@app.after_request
def set_content_type(response):
    mime = mimetypes.guess_type(request.path)
    
    if mime[0]:
        response.headers['Content-Type'] = mimetypes.guess_type(request.path)[0] + '; charset=utf-8'

    return response


@app.route('/')
def get_slash_home():
    return redirect(url_for('get_home'))
@app.route('/home')
def get_home():
    return render_template('home.html')

@app.route('/projects')
def get_projects():
    return Response('awnd', 400)

@app.route('/about')
def get_about():
    return render_template('about.html')


@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        # email, password
        data = request.form.to_dict()

        msg, code = utils.auth.login(db, db_cursor, data)

        return redirect(url_for('get_home'))
        #return Response(response = msg, status = code, mimetype = 'text/plain')

@app.route('/logout')
def get_logout():
    pass