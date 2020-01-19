from sqlalchemy import func
from model import User, Goal, Trail, TrailStatus, Hike, HikeResult
from model import connect_to_db, db
from server import app
from datetime import datetime
import re

def load_users():
    """Load a fake set of users from a users.csv"""

    User.query.delete()

    for row in open("seed_data/users.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        user_id = int(items[0])
        username = items[1]
        email = items[2]
        password = items[3] 
        first_name = items[4]
        last_name = items[5]
        image_url = items[6]
        created_on = items[7]
        canceled_by_user = items[8]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False

        user = User(user_id=user_id,
                    username=username,
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name,
                    image_url=image_url,
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
        
        goal_id = items[0]
        user_id = items[1]
        title = items[2]
        goal = items[3]
        numerical_value = items[4]
        description = items[5]
        goal_made_on = items[6]
        status = items[7]
        canceled_by_user = items[8]

        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False

        goal = Goal(goal_id=goal_id, 
                    user_id=user_id, 
                    title=title,
                    goal=goal, 
                    numerical_value=numerical_value, 
                    description=description,
                    goal_made_on=goal_made_on,
                    status=status,
                    canceled_by_user=canceled_by_user)

        db.session.add(goal)

    db.session.commit()

def load_trails():
    """Load trail data obtained from an API request from trails.csv"""
    num = 0
    Trail.query.delete()

    for row in open("seed_data/trails.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        
        trail_id = num
        api_trail_id = items[0]
        trail_name = items[1]
        description = items[2]
        difficulty = items[3]
        distance_in_miles = items[4]
        total_ascent = items[5]
        total_descent = items[6]
        location = items[7]
        latitude = items[8]
        longitude = items[9]
        api_rating = items[10]

        trail = Trail(
            )

        db.session.add(trail)
        num += 1

    db.session.commit()

def load_status_of_trails():
    """Load trail statuses obtained from an API request from status.csv"""
    num = 0
    TrailStatus.query.delete()

    for row in open("seed_data/status.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        
        status_id = num
        trail_id = num
        api_trail_id = items[0]
        trail_status = items[1]
        trail_status_details = items[2]
        trail_status_color = items[3]
        trail_status_at = items[4]

        status = TrailStatus(status_id=status_id,
                             trail_id=trail_id,
                             api_trail_id=api_trail_id,
                             trail_status=trail_status,
                             trail_status_details=trail_status_details,
                             trail_status_color=trail_status_color,
                             trail_status_at=trail_status_at)

        db.session.add(status)
        num += 1

    db.session.commit()

def load_hikes():
    """Load a fake set of hike from a hikes.csv"""

    Hike.query.delete()

    for row in open("seed_data/hikes.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        
        hike_id = items[0]
        user_id = items[1]
        trail_id = items[2]
        status = items[3]
        details = items[4]
        hiked_on = items[5]
        canceled_by_user = items[6]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False

        hike = Hike(hike_id=hike_id,
                    user_id=user_id,
                    trail_id=trail_id,
                    status=status,
                    details=details,
                    hiked_on=hiked_on,
                    canceled_by_user=canceled_by_user)

        db.session.add(hike)

    db.session.commit()

def load_results():
    """Load a fake set of hike results from a results.csv"""

    HikeResult.query.delete()

    for row in open("seed_data/results.csv"):
        row = row.rstrip()
        items = re.split(r',',row)
        
        results_id = items[0]
        hike_id = items[1]
        assessment = items[2]
        ascent_rating = items[3]
        distance_rating = items[4]
        challenge_rating = items[5]
        hike_time = items[6]
        image_url = items[7]
        canceled_by_user = items[8]
        canceled_by_user = items[6]
        if canceled_by_user == 'true':
            canceled_by_user = True
        else:
            canceled_by_user = False


        result = HikeResult(results_id=results_id,
                            hike_id=hike_id,
                            assessment=assessment,
                            ascent_rating=ascent_rating,
                            distance_rating=distance_rating,
                            challenge_rating=challenge_rating,
                            hike_time=hike_time,
                            image_url=image_url,
                            canceled_by_user=canceled_by_user)

        db.session.add(result)

    db.session.commit()

if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data
    load_users()
    load_goals()
    # load_trails()
    # load_status_of_trails()
    # load_hikes()
    # load_results()