from flask import Flask, render_template, redirect, flash, session, request
from flask_debugtoolbar import DebugToolbarExtension
import json
from sqlalchemy import func
from model import User, Goal, Trail, Hike, HikeResult, connect_to_db, db
from datetime import date
import jinja2
import re
import os
import pgeocode
import requests
 
key = os.environ["HIKINGPROJECT_KEY"]
coordinates = pgeocode.Nominatim('us')
app = Flask(__name__)
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
            return redirect('/home')
        else:
            flash('Incorrect login information; try again')
            return redirect('/login')
    if email_in_system:
        email_password = email_in_system.password
        if (email_password == password):
            session['current_user'] = email_in_system.user_id
            flash('Successfully Logged in')
            return redirect('/home')
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
    return render_template("profile.html")


@app.route("/edit-profile", methods=["GET"])
def show_profile_form():
    """Puts some of the user information into a form to change the info"""
    if not 'current_user' in session:
        return redirect('/')
    return render_template("edit-profile.html")


@app.route("/edit-profile", methods=["POST"])
def edit_user_profile():
    """Submit changes to the user profile"""
    if not 'current_user' in session:
        return redirect('/')
    return redirect("/profile")


@app.route("/trails", methods=["GET"])
def show_search_form():
    """Shows user a search form for a trail"""
    if not 'current_user' in session:
        return redirect('/')
    return render_template("trails.html", trails=None)


@app.route("/trails", methods=["POST"])
def load_search_results():
    """shows results from API for trails available given specifications"""
    if not 'current_user' in session:
        return redirect('/')
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


@app.route("/hikes/<api_trail_id>", methods=["GET"])
def add_hike(api_trail_id):
    if not 'current_user' in session:
        return redirect('/')
    user = User.query.filter_by(user_id=session["current_user"]).first()
    payload = {"key":key,
               "ids":api_trail_id}
    r_trail = requests.get("https://www.hikingproject.com/data/get-trails-by-id", 
                            params=payload)
    trail_obj = r_trail.json()['trails'][0]
    trail_in_db = Trail.query.filter_by(api_trail_id=api_trail_id).first()
    if trail_in_db:
        current_status_at = trail_in_db.status_at
        if not current_status_at == trail_obj["conditionDate"]:
            trail_in_db.status=trail_obj['conditionStatus']
            trail_in_db.status_details=trail_obj['conditionDetails']
            trail_in_db.status_at=trail_obj['conditionDate']
            db.session.commit()
    else:
        trail = Trail(api_trail_id = trail_obj['id'],
                      trail_name = trail_obj['name'],
                      description = trail_obj['summary'],
                      difficulty = trail_obj['difficulty'],
                      distance_in_miles = trail_obj['length'],
                      total_ascent = trail_obj['ascent'],
                      total_descent = trail_obj['descent'],
                      location = trail_obj['location'],
                      latitude = trail_obj['latitude'],
                      longitude = trail_obj['longitude'],
                      api_rating = trail_obj['stars'],
                      status=trail_obj['conditionStatus'],
                      status_details=trail_obj['conditionDetails'],
                      status_at=trail_obj['conditionDate'])
        db.session.add(trail)
        db.session.commit()
        trail_in_db = Trail.query.filter_by(api_trail_id=api_trail_id).first()
    
    hike = Hike(user_id=user.user_id,
                trail_id=trail_in_db.trail_id,
                is_complete=False,
                canceled_by_user=False)
    db.session.add(hike)
    db.session.commit()
    flash('Hike Added!')
    return redirect("/hikes")


@app.route("/goals", methods=["GET"])
def show_current_goals_and_progress():
    """View active goals and see graphs for current progress towards the goal"""
    if not 'current_user' in session:
        return redirect('/')
    goals = Goal.query.filter_by(user_id=session["current_user"]).all()
    return render_template("goals.html", goals=goals)


@app.route("/edit_goal/{goal_id}", methods=["POST"])
def show_existing_goal():
    """Modify or cancel a selected goal """
    pass
#  add similar route for submitting changes


@app.route("/edit_goal/{goal_id}", methods=["POST"])
def modify_existing_goal():
    """Modify or cancel a selected goal """
    pass
#  add similar route for submitting changes


@app.route("/add_goal", methods=["GET"])
def show_goal_form():
    """Render a form to make a new goal"""
    return render_template("new_goal.html")


@app.route("/add_goal", methods=["POST"])
def add_new_goal():
    """Verify and add goal to the database for a user"""
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


