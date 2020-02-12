from flask import Flask, render_template, redirect, flash, session, request
from flask_debugtoolbar import DebugToolbarExtension
import json
from sqlalchemy import func, and_
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

@app.route("/login", methods=["POST"])
def authenticate_user():
    """Take in user credentials and compare to existing if available"""
    
    user = request.form.get("user")
    password = request.form.get("password")
    user_in_system = User.query.filter_by(username=user).first()
    email_in_system = User.query.filter_by(email=user).first()
    if user_in_system:
        user_password = user_in_system.password
        if (user_password == password):
            session['current_user'] = user_in_system.user_id
            flash('Successfully Logged in')
            return session['current_user']
            
        else:
            flash('Incorrect login information; try again')
            return 'rejected'
    if email_in_system:
        email_password = email_in_system.password
        if (email_password == password):
            session['current_user'] = email_in_system.user_id
            flash('Successfully Logged in')
            return session['current_user']
        else:
            flash('Incorrect login information; try again')
            return 'rejected'
    flash('Incorrect login information; try again')
    return 'rejected'


@app.route("/logout", methods=["GET"])
def logout():
    """Logs the user out"""
    
    session.pop('current_user', None)
    session.modified = True
    flash("Logged Out")
    return 'logged out'


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
        return 'rejected username'

    elif email_in_system:
        flash("That email is taken, please choose a different one")
        return 'rejected email'
        
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
    
    return session


@app.route("/profile", methods=["GET"])
def show_profile():
    """Returns the current user's profile from initial intake info"""
    
    user = User.query.filter_by(user_id=user_id).first()
    print(user)
    
    return user


@app.route("/trails", methods=["POST"])
def load_search_results():
    """Returns available trails from API based on search parameters"""
    
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
    print(trails)
    
    return trails

@app.route("/hikes", methods=["POST"])
def complete_hike():
    """Submits a change of a hike's is_complete to True"""
    
    pass

@app.route("/hikes", methods=["GET"])
def show_current_hikes():
    """Returns a list of all hikes assocatied with the user:
        - status of each hike
        - links to edit status
        - link to add/ modify results if complete"""
        
    hikes = Hike.query.filter_by(user_id=session["current_user"]).all()
    print(hikes)
    
    return hikes


@app.route("/hikes/<api_trail_id>", methods=["GET"])
def add_hike(api_trail_id):
    """Checks if the trail
        - is in the db (if not, adds)
        - has most recent conditions (if not, updates)
        Creates a new hike on the trail with is complete as false
        """
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
    print(hike)
    
    return 'success'


@app.route("/goals", methods=["GET"])
def show_current_goals():
    """Returns active goals"""

    goals = Goal.query.filter(and_(user_id=session["current_user"],canceled_by_user=False)).all()
    return goals


@app.route("/goals", methods=["POST"])
def add_new_goal():
    """Adds a new goal to the database"""
    return 


@app.route("/goal/<goal_id>", methods=["GET"])
def return_goal_progress(goal_id):
    """Aggregates all hike results to show current progress towards a goal"""
    
    selected_goal = Goal.query.filter_by(goal_id=goal_id).first()
    hike_results = HikeResult.query.filter_by(user_id=user_id).all()
    
    goal_type = selected_goal.goal
    if goal_type == "NUMBER_HIKES":
        progress = {}
        for result in hike_results:
            print(result)
            # add keys and values for specific values (pie graph?)
    elif goal_type == "MILES_HIKED":
        print(results)
        # store hike id, milage, and dates (all in result)
    elif goal_type == "FEET_ASCENDED":
        print(results)
        # store hike id, ascent and dates (all in result)
    elif goal_type == "HIKEABLE_MILES":
        print(results)
        # store hike id, milage, and dates (all in result)
    elif goal_type == "HIKE_DIFFICULTY":
        print(results)
        # store hike id, difficulty (from the trail), and dates
    else:
        return 'invalid goal type'

    
    return
    
    
@app.route("/hike_results", methods=["POST"])
def add_hike_results():
    """Adds hike results on hike completion"""
    # process form information add to database if data can be added and return result
    pass 
    
    
@app.route("/hike_results", methods=["GET"])
def show_hike_results():
    """Returns Hike results for a given completed hike"""
    
    # get results from a form? 
    hike_id = 5
    result = hike_results.query.filter_by(hike_id=hike_id).first()

    return result


if __name__ == "__main__":
    app.debug = True
    # prevent template cacheing
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)
    DebugToolbarExtension(app)
    # run locally
    app.run(port=5000, host='0.0.0.0')


