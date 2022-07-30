import bcrypt
import re
from typing import Tuple
import os
import jwt


def login(db, db_cursor, data: dict) -> Tuple[str, int]:
    db_cursor.execute('SELECT * FROM users WHERE email = %s', (data['email'],))

    if len(db_cursor.fetchall()) == 0 or not bcrypt.checkpw(data['password'], db_cursor.fetchall()[3].encode()):
        return ('Wrong email address or password...or both.', 400)

    d = db_cursor.fetchall()[0]

    print(d)

    key = os.environ.get('JWT_KEY')
    encoded = jwt.encode(
        {'id': d[0], 'username': d[2]},
        os.environ.get('JWT_KEY'),
        algorithm = 'HS256'
    )

    return (encoded, 302)



def register(db, db_cursor, data: dict) -> Tuple[str, int]:
    global email_regex

    #region CheckFormData
    if not (data.get('username') and data.get('email') and data.get('password') and data.get('confirm_password')):
        return ('You must fill all the required fields.', 400)

    db_cursor.execute('SELECT * FROM users WHERE email = %s;', (data['email'],))
    if len(db_cursor.fetchall()) != 0:
        return ('An account with the same email already exists!', 400)
    db_cursor.execute('SELECT * FROM users WHERE usr = %s;', (data['username'],))
    if len(db_cursor.fetchall()) != 0:
        return ('An account with the same username already exists!', 400)

    # Same username scheme of GitHub
    if re.fullmatch('^[a-z0-9\d](?:[a-z0-9\d]|-(?=[a-z0-9\d])){0,29}', data['username']) == None:
        return ('Invalid username!', 400)
    if len(data['email']) > 254 or re.fullmatch('''[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?''', data['email']) == None:
        return ('Invalid email address!', 400)
    if re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$', data['password']) == None:
        return ('Invalid password!', 400)
    if data['password'] != data['confirm_password']:
        return ('Password does not match confirmation password!', 400)
    if data.get('first_name') != '':
        if len(data['first_name']) > 30 or re.fullmatch('^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$', data['first_name']) == None:
            return ('Invalid first name!', 400)
    if data.get('last_name') != '':
        if len(data['last_name']) > 30 or re.fullmatch('^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$', data['last_name']) == None:
            return ('Invalid last name!', 400)
    #endregion

    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()).decode()                
    db_cursor.execute('''
        INSERT INTO users (email, usr, psw, birthday, first_name, last_name) VALUES (%s, %s, %s, %s, %s, %s);
    ''', (data['email'], data['username'], hashed, data.get('birthday') or None, data.get('first_name') or None, data.get('last_name') or None))

    db.commit()

    """
    ADD SEND EMAIL ADDRESS VERIFY WITH HOME-MADE SMTP
    """
    return ('Registration completed.', 200)

def logout(db, db_cursor, data: dict):
    pass

def check_email(db, db_cursor, email: str) -> bool:
    """
    Check an email address, if the email is already registered it will return False else True.
    """
    db_cursor.execute('SELECT * FROM users WHERE email = %s;', (email,))
    if len(db_cursor.fetchall()) != 0:
        return False

    return True    

def check_username(db, db_cursor, username: str) -> bool:
    """
    Check a username, if the username is already used it will return False else True.
    """

    db_cursor.execute('SELECT * FROM users WHERE usr = %s;', (username,))
    if len(db_cursor.fetchall()) != 0:
        return False

    return True