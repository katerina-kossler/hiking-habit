from flask import Flask, render_template, redirect, flash, session, request, jsonify
import json
from sqlalchemy import func, and_, desc
from model import User, Goal, Trail, Hike, HikeResult, connect_to_db, db
from datetime import date, datetime
import hashlib
import re
import os
import pgeocode
import requests
import random
 
key = os.environ["HIKINGPROJECT_KEY"]
coordinates = pgeocode.Nominatim('us')
app = Flask(__name__)
app.secret_key = 'this-should-be-something-unguessable'



# ---------- Initial set up and user authentication  ---------- #
@app.route("/")
def show_homepage():
    """Show the application's homepage with links to other routes."""
    
    return render_template("homepage.html")
    
@app.route("/api/quote", methods=["GET"])
def get_random_quote():
    """Returns a random trail from the list to display on the trail search"""
    
    quotes = [
        '''"I took a walk in the woods and came out taller than trees." - Henry David Thoreau"''',
        '''"And into the forest I go, To lose my mind and find my soul." - Unknown''',
        ''''In every walk with nature, one received far more than he seeks." – John Muir''',
        '''"Of all the paths you take in life, make sure a few of them are dirt." – John Muir''',
        '''"Because in the end, you won’t remember the time you spent working in an office or mowing the lawn. Climb that goddamn mountain." – Jack Kerouac''',
        '''"There is no such thing as bad weather, only inappropriate clothing." – Sir Rannulph Fiennes''',
        '''"Look deep into nature and you will understand everything better." - Albert Einstein''',
        '''"Without new experiences, something inside of us sleeps. The sleeper must awaken." - Frank Herbert''',
        '''"It’s not the mountain we conquer, but ourselves." - Sir Edmund Hillary''',
        '''"There are no shortcuts to any place worth going." - Beverly Sills''',
        '''"Wilderness is not a luxury but a necessity of the human spirit, and as vital to our lives as water and good bread." - Edward Abbey''',
        '''"And into the forest I go, to lose my mind and find my soul." - John Muir''',
        '''"The journey of a thousand miles begins with a single step." - Lao Tzu'''
    ]
    
    return jsonify(quote=random.choice(quotes))

@app.route("/api/login", methods=["POST"])
def authenticate_user():
    """Take in user credentials and compare to existing if available"""
    
    user = request.form.get("user")
    password = request.form.get("password")
    password_256 = hashlib.sha256(password.encode()).hexdigest()
    user_in_system = User.query.filter_by(username=user).first()
    email_in_system = User.query.filter_by(email=user).first()
    if user_in_system:
        user_password = user_in_system.password
        if (user_password == password_256):
            session['current_user'] = user_in_system.user_id
            return {'userId': session['current_user'],
                    'first': user_in_system.first_name}
        else:
            return 'Incorrect password; try again'
    if email_in_system:
        email_password = email_in_system.password
        if (email_password == password_256):
            session['current_user'] = email_in_system.user_id
            flash('Successfully Logged in')
            return {'userId': session['current_user'],
                    'first': email_in_system.first_name}
        else:
            return 'Incorrect password; try again'
    return 'Incorrect login information; try again'


@app.route("/api/register", methods=["POST"])
def intake_user_info():
    """Add new user information to the database if a new username and 
       email are chosen"""
    
    username = request.form.get("username")
    if not username:
        return 'Enter a username'
    email = request.form.get("email")
    if not email:
        return "Enter an email"
    username_in_system = User.query.filter_by(username=username).first()
    email_in_system = User.query.filter_by(email=email).first()
    password = request.form.get("password")
    if not password:
        return "Enter a password"
    password_256 = hashlib.sha256(password.encode()).hexdigest()
    created_on = date.today()
    first_name = request.form.get("first")
    if not first_name:
        return "Enter your first name"
    last_name = request.form.get("last")
    if not last_name:
        return "Enter your last name"
    username_in_system = User.query.filter_by(username=username).first()
    email_in_system = User.query.filter_by(email=email).first()
    if username_in_system:
        return 'That username is taken, please choose a different one.'
    if email_in_system:
        return 'That email is taken, please choose a different one'
    user = User(username=username,
                email=email,
                password=password_256,
                created_on=created_on,
                first_name=first_name,
                last_name=last_name,
                canceled_by_user=False)
    db.session.add(user)
    db.session.commit()
    user = User.query.filter_by(username=username).first()
    session["current_user"] = user.user_id
    return {'userId': session['current_user'],
            'first': user.first_name}


@app.route("/api/logout", methods=["GET"])
def logout():
    """Logs the user out (removes from current session)"""
    
    session.pop('current_user', None)
    session.modified = True
    return 'logged out'


@app.route("/api/profile", methods=["GET"])
def show_profile():
    """Returns the current user's profile from initial intake info"""
    
    user_id = session.get('current_user', None)
    if user_id:
        user = User.query.filter_by(user_id=user_id).first()
        user_info = {'userId': user_id,
                    'first':user.first_name,
                    'last':user.last_name,
                    'createdOn':user.created_on.strftime("%A %B %d, %Y")} ## datetime object formatting
        return jsonify(user_info)
    else:
        return 'Please login and try again.'


# ---------- REI Hiking Project interactions  ---------- #
@app.route("/api/trails", methods=["POST"])
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
    trails = r_trails.json().get('trails', None)
    if trails:
        trails = r_trails.json()['trails']
        return jsonify(trails)
    else:
        return "No trails found in that area, please change results and try again."


# ---------- Hike view, creation, completion, & cancelation (also result cancelation) ---------- #
@app.route("/api/hikes", methods=["GET"])
def show_current_hikes():
    """Returns a list of all (non-canceled) hikes assocatied with the user"""
    
    hikes = Hike.query.filter((Hike.user_id == session["current_user"]) &
                              (Hike.canceled_by_user == False)).all()
    hikes_info = []
    for hike in hikes:
        hike_info = {'hikeId':hike.hike_id,
                     'trailId':hike.trail_id,
                     'trailName':hike.trail.trail_name,
                     'trailDescription':hike.trail.description,
                     'isComplete':hike.is_complete}
        hikes_info.append(hike_info)
    return jsonify(hikes_info)


@app.route("/api/hikes", methods=["POST"])
def add_hike():
    """Checks if the selected trail to hike:
        - is in the db (if not, adds)
        - has most recent conditions (if not, updates) 
        and creates a new hike on the trail with is_complete as false"""
    
    api_trail_id = request.form.get("apiId")
    user = User.query.filter_by(user_id=session["current_user"]).first()
    payload = {"key":key,
               "ids":api_trail_id}
    r_trail = requests.get("https://www.hikingproject.com/data/get-trails-by-id", 
                            params=payload)
    if r_trail.json()['success'] == 0:
        return 'Failed to add hike, try another trail or try again later.'                 
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
    user_id = session.get("current_user", None)
    if user_id:
        hike_to_do = Hike.query.filter((Hike.user_id == user_id) &
                                        (Hike.trail_id == trail_in_db.trail_id ) &
                                        (Hike.is_complete == False) &
                                        (Hike.canceled_by_user == False)).all()
        if hike_to_do:
            return 'This trail is already in your hikes to complete.'
        hike = Hike(user_id=user.user_id,
                    trail_id=trail_in_db.trail_id,
                    is_complete=False,
                    canceled_by_user=False)               
        db.session.add(hike)
        db.session.commit()
        return 'Added hike on this trail!'


@app.route("/api/complete_hike", methods=["POST"])
def complete_hike():
    """Submits a change of a hike's is_complete to True"""
    
    hike_id = request.form.get('hikeId')
    hike = Hike.query.filter_by(hike_id=hike_id).first()
    hike.is_complete = True
    db.session.commit()
    return 'Hike is complete, please fill out the hike result'
    

@app.route("/api/cancel_hike", methods=["POST"])
def cancel_hike():
    """Submits a change of a hike's canceled_by_user to True"""
    
    hike_id = request.form.get('hikeId')
    hike = Hike.query.filter_by(hike_id=hike_id).first()
    if hike:
        hike.canceled_by_user = True
        if (hike.is_complete == True):
            result = HikeResult.query.filter_by(hike_id=hike_id).first()
            if result:
                result.canceled_by_user = True
                db.session.commit() 
                return 'Hike & hike result are canceled'
        db.session.commit()
        return 'Hike is canceled'
    else:
        return 'Hike could not be found'


# ---------- Goal view, creation, progress & cancelation ---------- #
@app.route("/api/goals", methods=["GET"])
def show_current_goals():
    """Returns active goals"""
    user_id = session.get('current_user', None)
    if user_id:
        goal_objects = Goal.query.filter((Goal.user_id == user_id) &
                                         (Goal.canceled_by_user == False)).all()
        goals = []
        for goal_object in goal_objects:
            goal_from_enum = str(goal_object.goal).split('.')[1].lower()
            status_from_enum = str(goal_object.status).split('.')[1].lower()
            goal = {'goalId': goal_object.goal_id,
                    'title': goal_object.title,
                    'type': goal_from_enum,
                    'numericalValue': goal_object.numerical_value,
                    'description': goal_object.description,
                    'createdOn': goal_object.created_on.isoformat(),
                    'status': status_from_enum}
            goals.append(goal)   
        return jsonify(goals)
    return 'Failed, please login and try again'


@app.route("/api/goals", methods=["POST"])
def add_new_goal():
    """Adds a new goal to the database"""
    
    user_id = session.get('current_user',None)
    if user_id:
        title = request.form.get('title')
        goal_type = request.form.get('type')
        numerical_value = float(request.form.get('numericalValue'))
        created_on = datetime.today()
        description = request.form.get('description')
        status = 'NOT_STARTED'
        canceled_by_user = False
        goal = Goal(user_id=user_id, 
                    title=title,
                    goal=goal_type, 
                    numerical_value=numerical_value, 
                    description=description,
                    created_on=created_on,
                    status=status,
                    canceled_by_user=canceled_by_user)
        db.session.add(goal)
        db.session.commit()
        return 'Success; goal added!'
    return 'Failed; Please login and try again'


@app.route("/api/progress", methods=["GET"])
def show_goal_progress():
    """Aggregates all hike results to show current progress towards a goal"""
    
    user_id = session.get('current_user',None)
    if user_id:
        goal_id = request.args.get("goalId")
        selected_goal = Goal.query.filter_by(goal_id=goal_id).first()
        goal_type = str(selected_goal.goal)
        status_from_enum = str(selected_goal.status).split('.')[1]
        completed_hikes = Hike.query.filter((Hike.user_id == user_id) & 
                                  (Hike.canceled_by_user == False) &
                                  (Hike.is_complete == True)).all()
        unsorted_results = []
        for hike in completed_hikes:
            result = HikeResult.query.filter_by(hike_id = hike.hike_id).first()
            if result:
                unsorted_results.append(result)
        hike_results = sorted(unsorted_results, key=lambda x: x.hiked_on)
        hikes = []
        if goal_type == "GoalType.NUMBER_HIKES":
            num = 0
            for result in hike_results:
                num += 1
                rating_from_enum = str(result.challenge_rating).split('.')[1].lower()
                hike = {'hikeId': result.hike_id,
                        'value': num,
                        'rating': rating_from_enum,
                        'ratingType': 'Challenge Rating',
                        'hikedOn': result.hiked_on.isoformat()}
                hikes.append(hike)
                if num >= selected_goal.numerical_value:
                    selected_goal.status = 'COMPLETE'
                    db.session.commit()
        elif goal_type == "GoalType.MILES_HIKED":
            miles = 0
            for result in hike_results:
                miles += result.distance_in_miles
                rating_from_enum = str(result.distance_rating).split('.')[1].lower()
                hike = {'hikeId': result.hike_id,
                        'value': miles,
                        'rating': rating_from_enum,
                        'ratingType': 'Distance Rating',
                        'hikedOn': result.hiked_on.isoformat()}
                hikes.append(hike)
                if miles >= selected_goal.numerical_value:
                    selected_goal.status = 'COMPLETE'
                    db.session.commit()
        elif goal_type == "GoalType.FEET_ASCENDED":
            feet = 0
            for result in hike_results:
                trail = Hike.query.filter_by(hike_id=result.hike_id).first()
                trail_details=Trail.query.filter_by(trail_id=trail.trail_id).first()
                feet += trail_details.total_ascent
                rating_from_enum = str(result.ascent_rating).split('.')[1].lower()
                hike = {'hikeId': result.hike_id,
                        'value': feet,
                        'rating': rating_from_enum,
                        'ratingType': 'Ascent Rating',
                        'hikedOn': result.hiked_on.isoformat()}
                hikes.append(hike)
                if feet >= selected_goal.numerical_value:
                    selected_goal.status = 'COMPLETE'
                    db.session.commit()
        elif goal_type == "GoalType.HIKEABLE_MILES":
            for result in hike_results:
                rating_from_enum = str(result.distance_rating).split('.')[1].lower()
                hike = {'hikeId': result.hike_id,
                        'value': result.distance_in_miles,
                        'rating': rating_from_enum,
                        'ratingType': 'Distance Rating',
                        'hikedOn': result.hiked_on.isoformat()}
                hikes.append(hike)
                if hike['value'] >= selected_goal.numerical_value:
                    selected_goal.status = 'COMPLETE'
                    db.session.commit()
        else:
            return 'Invalid goal type.'
        if hikes and status_from_enum == 'NOT_STARTED':
            selected_goal.status = 'IN_PROGRESS'
            db.session.commit()
        return jsonify(hikeData=hikes,
                       goalStatus=str(selected_goal.status).split('.')[1].lower()
                       )
    return 'Please login and try again.'

    
@app.route("/api/cancel_goal", methods=["POST"])
def cancel_goal():
    """Submits a change of a goal's canceled_by_user to True"""
    
    goal_id = request.form.get("goalId")
    goal = Goal.query.filter_by(goal_id=goal_id).first()
    goal.canceled_by_user = True 
    db.session.commit()
    return 'Goal is canceled.'

# ---------- Hike Results view, creation & progress ---------- #
@app.route("/api/hike_results", methods=["GET"]) #might delete this - currently not used
def show_all_hike_results():
    """Returns Hike results for a user"""
    
    user_id = session.get("current_user", None)
    if user_id:
        results = HikeResult.query.filter((HikeResult.user_id == user_id) &
                                          (HikeResult.canceled_by_user == False)).all()
        return jsonify(results)
    return 'No active results found'
    
# working on this route    
@app.route("/api/hike_result_and_trail_by_id", methods=["GET"])
def show_hike_result():
    """Returns the hike result and trail information for a selected completed hike"""
    
    hike_id = request.args.get("hikeId")
    result = HikeResult.query.filter((HikeResult.hike_id == hike_id) &
                                     (HikeResult.canceled_by_user == False)).first()
    if result:
        trail = Hike.query.filter_by(hike_id=hike_id).first()
        trail_id = trail.trail_id
        trail_details=Trail.query.filter_by(trail_id=trail_id).first()
        ascent_from_enum = str(result.ascent_rating).split('.')[1]
        ascent_from_enum = ascent_from_enum.replace("_", " ")
        distance_from_enum = str(result.distance_rating).split('.')[1]
        distance_from_enum = distance_from_enum.replace("_", " ")
        challenge_from_enum = str(result.challenge_rating).split('.')[1]
        challenge_from_enum = challenge_from_enum.replace("_", " ")
        result_details = {'name': trail_details.trail_name,
                          'summary': trail_details.description,
                          'difficulty': trail_details.difficulty,
                          'loc': trail_details.location,
                          'lat': trail_details.latitude,
                          'lng': trail_details.longitude,
                          'len': trail_details.distance_in_miles,
                          'asc': trail_details.total_ascent,
                          'dsc': trail_details.total_descent,
                          'date': trail_details.status_at,
                          'status': trail_details.status,
                          'details': trail_details.status_details,
                          'assessment': result.assessment,
                          'distance': result.distance_in_miles,
                          'hikedOn': result.hiked_on.strftime("%A %B %d, %Y"),
                          'ascentRating': ascent_from_enum.lower(),
                          'distanceRating': distance_from_enum.lower(),
                          'challengeRating': challenge_from_enum.lower(),
                          'hikeTime': result.hike_time}
        return jsonify(result_details)
    else:
        return 'Add Hike Result'
    
    
@app.route("/api/hike_result", methods=["POST"])
def add_hike_results():
    """Adds hike results on hike completion"""

    hike_id = request.form.get('hikeId')
    assessment = request.form.get('assessment')
    distance_in_miles = request.form.get('distance')
    str_hiked_on = request.form.get('hikedOn')
    #knowing date object in html form comes in format YYYY-MM-DD
    format_hiked_on = '%Y-%m-%d'
    hiked_on = datetime.strptime(str_hiked_on, format_hiked_on)
    ascent_rating = request.form.get('ascentRating')
    distance_rating = request.form.get('distanceRating')
    challenge_rating = request.form.get('challengeRating')
    hike_time = request.form.get('hikeTime')
    canceled_by_user = False
    result = HikeResult(hike_id=hike_id,
                        assessment=assessment,
                        distance_in_miles=distance_in_miles,
                        hiked_on=hiked_on,
                        ascent_rating=ascent_rating,
                        distance_rating=distance_rating,
                        challenge_rating=challenge_rating,
                        hike_time=hike_time,
                        canceled_by_user=canceled_by_user)
    db.session.add(result)
    db.session.commit()
    return 'Result Added!'
    
    
@app.route("/api/trail_from_hike_id", methods=["GET"])    
def show_trail_details():
    """Returns an object containing the trail details from an input hike id"""
    
    hike_id = request.args.get("hikeId")
    trail = Hike.query.filter_by(hike_id=hike_id).first()
    if trail:
        trail_id = trail.trail_id
        trail_details=Trail.query.filter_by(trail_id=trail_id).first()
        if trail_details:
            trail_object={'name': trail_details.trail_name,
                          'summary': trail_details.description,
                          'difficulty': trail_details.difficulty,
                          'loc': trail_details.location,
                          'lat': trail_details.latitude,
                          'lng': trail_details.longitude,
                          'len': trail_details.distance_in_miles,
                          'asc': trail_details.total_ascent,
                          'dsc': trail_details.total_descent,
                          'date': trail_details.status_at.strftime("%A %B %d, %Y"), # need to confirm this format
                          'status': trail_details.status,
                          'details': trail_details.status_details}
            return jsonify(trail_object)
    return 'Trail is not in system, please cancel hike and try again.'
        

# ---------- Error Handling for 404 Errors ---------- #
@app.errorhandler(404)
def redirect_to_root(e):
    """When the user refreshes or goes to a route not mananaged by React Router
       on the client-side, takes the user back to root"""
    return redirect('/')


# ---------- Flask App Bits ---------- #
if __name__ == "__main__":
    # app.debug = True 
    
    connect_to_db(app)
    
    # app.run(port=5000, host='0.0.0.0')
    app.run()


# Made by Katerina Kossler, 2020.