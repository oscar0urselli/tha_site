import dotenv
from flask import Flask, redirect, url_for, render_template, request, Response, abort
import mimetypes



dotenv.load_dotenv()

mimetypes.add_type('application/javascript', '.js')


app = Flask(__name__, static_folder = 'public')



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
    return render_template('projects.html')

@app.route('/about')
def get_about():
    return render_template('about.html')