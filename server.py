from flask import Flask, render_template, redirect, flash, session, request
from flask_debugtoolbar import DebugToolbarExtension
import json
from sqlalchemy import func
from model import User, Goal, Trail, Hike, connect_to_db, db
from datetime import date
import jinja2
import re
import os
import pgeocode
import requests
 
key = os.environ["HIKINGPROJECT_KEY"]
coordinates = pgeocode.Nominatim('us')
app = Flask(__name__)

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
    email_in_system = User.query.filter_by(email=email).first()
    if user_in_system:
        user_password = user_in_system.password
        if (user_password == password):
            session['current_user'] = user_in_system.user_id
            flash('Successfully Logged in')
            return redirect('/profile')
        else:
            flash('Incorrect login information; try again')
            return redirect('/login')
    if email_in_system:
        email_password = email_in_system.password
        if (email_password == password):
            session['current_user'] = email_in_system.user_id
            flash('Successfully Logged in')
            return redirect('/profile')
        else:
            flash('Incorrect login information; try again')
            return redirect('/login')
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
    username_in_system = User.query.filter_by(username=username).first()
    email_in_system = User.query.filter_by(email=email).first()
    if username_in_system:
        flash("That username is taken, please choose a different one.")
        return redirect("/register") # maybe keep most of info in redirect
    elif email_in_system:
        flash("That email is taken, please choose a different one")
        return redirect("/register")
    user = User(username=username,
                email=email,
                password=password,
                created_on=created_on,
                first_name=first_name,
                last_name=last_name,
                canceled_by_user=False)
    db.session.add(user)
    db.session.commit()
    user = User.query.filter_by(username=username).first()
    session["current_user"] = user.user_id
    return redirect("/profile")

@app.route("/profile", methods=["GET"])
def show_profile():
    """Loads a user's profile from initial intake info"""
    if not 'current_user' in session:
        return redirect('/')
    user_id = session["current_user"]
    user = User.query.get(user_id)
    goals = Goal.query.filter_by(user_id=user_id).all()
    hikes = Goal.query.filter_by(user_id=user_id).all()
    # need to think about how I want to connect in the hike results 
    return render_template("profile.html", user=user, goals=goals)

@app.route("/trails", methods=["GET"])
def show_search_form():
    """Shows user a search form for a trail"""
    if not 'current_user' in session:
        return redirect('/')
    return render_template("trails.html", trails=None)


@app.route("/trails", methods=["POST"])
def load_search_results():
    """shows results from API for trails available given specifications"""
    zipcode = request.form.get("zipcode")
    details = coordinates.query_postal_code(zipcode)
    latitude = details["latitude"]
    longitude = details["longitude"]
    search_distance = request.form.get("maxRadius")
    min_length = request.form.get("length")
    sort = request.form.get("sort")
    max_results = request.form.get("maxResults")
    payload = {"key":key,
               "lon":longitude,
               "lat":latitude,
               "maxDistance":search_distance,
               "minLength":min_length,
               "sort":sort,
               "maxResults":max_results}
    r_trails = requests.get("https://www.hikingproject.com/data/get-trails", 
                            params=payload)
    trails = r_trails.json()['trails']
    return render_template("trails.html", trails=trails)

@app.route("/hikes", methods=["GET"])
def show_current_hikes():
    """Show a list of all hikes assocatied with the user:
        - status of each hike
        - links to edit status
        - link to add/ modify results if complete"""
    if not 'current_user' in session:
        return redirect('/')
    hikes = Hike.query.filter_by(user_id=session["current_user"]).all()
    return render_template("hikes.html", hikes=hikes)

@app.route("/hikes/{trail_id}", methods=["POST"])
def add_hike():
    """Add a trail to a list of hikes the user wants to go on;
       if trail is already in hikes and is not complete display an alert that
       hike is already in list"""

    # this should occur when user selects a trail from the search trail page,
    # user should redirect to the new hike info after added to db
    print(trail_id)
    # check if trail is in the db
    # if yes, check status date 
    # if status can be updated , do so

    # can edit hike (status, date, etc)
    
    # if hike is complete / updated to complete open new results options to review
        # details
        # hiked_on
        # ascent_rating
        # distance_rating
        # challenge_rating
        # hike_time
    pass

@app.route("/goals", methods=["GET"])
def show_current_goals_and_progress():
    """View active goals and see graphs for current progress towards the goal"""
    if not 'current_user' in session:
        return redirect('/')
    goals = Goal.query.filter_by(user_id=session["current_user"]).all()
    return render_template("goals.html", goals=goals)

@app.route("/edit_goal/{goal_id}", methods=["GET"])
def modify_goal():
    """Modify or cancel a selected goal """

#  add similar route for submitting changes


@app.route("/edit_goal/{goal_id}", methods=["POST"])
def modify_goal():
    """Modify or cancel a selected goal """
    pass
#  add similar route for submitting changes

@app.route("/add_goal", methods=["GET"])
def show_goal_form():
    """Render a form to make a new goal"""
    return render_template("new_goal.html")

@app.route("/add_goal", methods=["POST"])
def show_goal_form():
    """Verify and add goal to the database for a user"""
    pass

@app.route("/check_status/{trail_id}", methods=["GET"])
def check_current_trail_status():
    """Checks for the current status of a trail"""
# maybe I want to rethink my model in this respect as pulling trail data 

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


