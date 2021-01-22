# import os

from flask import Flask, flash, jsonify, redirect, render_template, request
# from flask_session import Session
# from tempfile import mkdtemp
# from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
# from werkzeug.security import check_password_hash, generate_password_hash

# # Configure application
# app = Flask(__name__)

# # Ensure templates are auto-reloaded
# app.config["TEMPLATES_AUTO_RELOAD"] = True

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, Wald!'