from flask import Flask, render_template, redirect, flash, session, request
from flask_debugtoolbar import DebugToolbarExtension
import json
from sqlalchemy import func
from model import User, Goal, Trail, TrailStatus, Hike, HikeResult, connect_to_db, db
from datetime import date
import jinja2
import re
import os
import pgeocode
import requests

coordinates = pgeocode.Nominatim('us')
app = Flask(__name__)

# A secret key is needed to use Flask sessioning features

# To-do: make actual key and store locally until full deployment
app.secret_key = 'this-should-be-something-unguessable'
app.jinja_env.undefined = jinja2.StrictUndefined

@app.route("/")
def show_homepage():
    """Show the application's homepage with links to other routes."""
    return render_template("homepage.html")

@app.route("/login", methods=["GET"])
def show_login_form():
    """Shows the login info for taking in username and/or email and password"""
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def authenticate_user():
    """Take in user credentials and compare to existing if available"""
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    user_in_system = User.query.filter_by(username=username).first()
    if user_in_system:
        user_password = user_in_system.password

    email_in_system = User.query.filter_by(email=email).first()
    if email_in_system:
        email_password = email_in_system.password

    if (user_password == password) or (email_password == password):
        if user_in_system:
            session['current_user'] = user_in_system.user_id
        else:
            session['current_user'] = email_in_system.user_id

        flash('Successfully Logged in')
        return redirect('/profile')

    else:
        flash('Incorrect login information; try again')
        return redirect('/login')

@app.route("/logout", methods=["GET"])
def logout():
    """Logs the user out and returns to homepage"""

    session.pop('current_user', None)
    session.modified = True

    return redirect('/')


@app.route("/register", methods=["GET"])
def show_user_form():
    """Displays the form to register a new user"""
    return render_template("sign-up.html")

@app.route("/register", methods=["POST"])
def intake_user_info():
    """Add new user information to the users DB """

    username = request.form.get("username")
    email = request.form.get("email")

    username_in_system = User.query.filter_by(username=username).first()
    email_in_system = User.query.filter_by(email=email).first()
    password = request.form.get("password") # hash with salt
    created_on = date.today()
    first_name = request.form.get("first")
    last_name = request.form.get("last")
    image_url = request.form.get("url")

    username_in_system = User.query.filter_by(username=username).first()
    email_in_system = User.query.filter_by(email=email).first()

# once basics work we want to salt and hash the input password before
#  saving in db, then might want to generate hashed passwords and update for current users
#  salted = password + salt (stored externally)
#  os.urandom(size) -- need to append salt and the hashed password to the db / model

    if username_in_system:
        flash("That username is taken, please choose a different one.")
        return redirect("/register") # maybe keep most of info in redirect
    elif email_in_system and email_in_system.canceled_by_user == False:
        flash("There is already an active account with that email!")
        return redirect("/register")
    else:
        if image_url == "https://example.com":
            image_url = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
# if time, have a better system or use tool to show user a preview of their profile picture

        user = User(username=username,
                    email=email,
                    password=password,
                    created_on=created_on,
                    first_name=first_name,
                    last_name=last_name,
                    image_url=image_url,
                    canceled_by_user=False)
        db.session.add(user)
        db.session.commit()

        return redirect("/login")

@app.route("/profile", methods=["GET"])
def show_profile():
    """Loads a user's profile from initial intake info"""
    if not 'current_user' in session:
        return redirect('/')

    user_id = session["current_user"]
    user = User.query.get(user_id)
    goals = Goal.query.filter_by(user_id=user_id).all()
    print(user)
    print(goals)
    return render_template("profile.html", user=user, goals=goals)

def edit_profile():
    """give user the option to edit their information"""
    user_id = session["current_user"]
    user = User.query.get(user_id)

    return render_template("edit-profile.html", user=user)
    # still in progress

@app.route("/profile", methods=["POST"])
def update_profile():
    """Updates a registered, active user's profile information"""
    pass

@app.route("/trails", methods=["GET"])
def show_search_form():
    """Shows user a search form for a trail"""

    return render_template("trails.html")


@app.route("/trails", methods=["POST"])
def load_search_results():
    """shows results from API for trails available given specifications"""


    zipcode = request.form.get("zipcode")

    details = coordinates.query_postal_code(zipcode)
    latitude = details["latitude"]
    longitude = details["longitude"]

    search_distance = request.form.get("max_radius")
    min_length = request.form.get("length")
    sort = request.form.get("sort")
    max_results = request.form.get("max_results")

    pass

@app.route("/goals", methods=["GET"])
def show_current_goals_and_progress():
    """View active goals and see graphs for current progress towards the goal"""
    pass


@app.route("/goals", methods=["POST"])
def change_goals():
    """Add, modify, or cancel a selected, active goal"""
    pass

@app.route("/hikes", methods=["GET"])
def show_current_hikes():
    """Show a list of all hikes assocatied with the user:
        - status of each hike
        - links to edit status
        - link to add/ modify results if complete"""

    pass

@app.route("/hikes", methods=["POST"])
def add_hike():
    """Add a trail to a list of hikes the user wants to go on;
       if trail is already in hikes and is not complete display an alert that
       hike is already in list"""
    pass

@app.route("/results", methods=["GET"])
def show_completed_hike_results():
    """Shows all hike results"""

    pass

@app.route("/results", methods=["POST"])
def add_hike_result():
    """Posts any changes to or adds a hike result for a completed hike"""

    pass

@app.route("/about")
def show_about_page():
    return render_template("about.html")




if __name__ == "__main__":
    app.debug = True
    # prevent template cacheing
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)
    DebugToolbarExtension(app)
    # run locally
    app.run(port=5000, host='0.0.0.0')


