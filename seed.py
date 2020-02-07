import json
from sqlalchemy import func
from model import User, Goal, Trail, Hike, connect_to_db, db
from server import app
from datetime import datetime
import re

def load_users():
    """Load a fake set of users from a users.csv"""

    User.query.delete()
    for row in open("seed_data/users.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        username = items[1]
        email = items[2]
        password = items[3] 
        first_name = items[4]
        last_name = items[5]
        created_on = items[7]
        canceled_by_user = items[8]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False
        user = User(username=username,
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name,
                    created_on=created_on,
                    canceled_by_user=canceled_by_user)

        db.session.add(user)

    db.session.commit()

def load_goals():
    """Load a fake set of users from a users.csv"""

    Goal.query.delete()
    for row in open("seed_data/goals.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        user_id = items[1]
        title = items[2]
        goal = items[3]
        numerical_value = items[4]
        description = items[5]
        created_on = items[6]
        status = items[7]
        canceled_by_user = items[8]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False
        goal = Goal(user_id=user_id, 
                    title=title,
                    goal=goal, 
                    numerical_value=numerical_value, 
                    description=description,
                    created_on=created_on,
                    status=status,
                    canceled_by_user=canceled_by_user)

        db.session.add(goal)

    db.session.commit()

def load_trails_and_status():
    """Load trail data obtained from an API request from trails.csv"""
    trail_json = json.load(open("seed_data/trails_94703.json"))
    Trail.query.delete()
    for trail_obj in trail_json['trails']:
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


def load_hikes():
    """Load a fake set of hike from a hikes.csv"""

    Hike.query.delete()
    for row in open("seed_data/hikes.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        user_id = items[0]
        trail_id = items[1]
        status = items[2]
        details = items[3]
        hiked_on = items[4]
        ascent_rating = items[5]
        distance_rating = items[6]
        challenge_rating = items[7]
        hike_time = items[8]
        canceled_by_user = items[9]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False
        hike = Hike(user_id=user_id,
                    trail_id=trail_id,
                    status=status,
                    details=details,
                    hiked_on=hiked_on,
                    ascent_rating=ascent_rating,
                    distance_rating=distance_rating,
                    challenge_rating=challenge_rating,
                    hike_time=hike_time,
                    canceled_by_user=canceled_by_user)

        db.session.add(hike)
    db.session.commit()

if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # # Import different types of data
    load_users()
    load_goals()
    load_trails_and_status()
    load_hikes()