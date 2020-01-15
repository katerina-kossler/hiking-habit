import enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Need to add references between tables 


class User(db.model):
    """Users of the web app"""
    __tablename__ = 'users'

    user_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True)
    username = db.Column(db.String(128),
                         nullable=False)
    email = db.Column(db.String(256), 
                      nullable=False)
    password = db.Column(db.String(64), 
                         nullable=False) # hash with salt
    created_at = db.Column(db.DateTime(), 
                           nullable=False)
    first_name = db.Column(db.String(64), 
                           nullable=False)
    last_name = db.Column(db.String(64), 
                          nullable=False)
    bio = db.Column(db.String(1024),
                    nullable=True)
    image_url = db.Column(db.String(1024)
                          nullable=True)
    zipcode = db.Column(db.String(10),
                        nullable=True)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)

class GoalType(enum.Enum):
    number_hikes = 1
    miles_hiked = 2
    feet_ascended = 3
    hikeable_miles = 4
    hike_difficulty = 5

class Progress(enum.Enum):
    not_started = 1
    in_progress = 2
    complete = 3

class Goal(db.model):
    """General; hiking related goals"""
    __tablename__ = 'goals'

    goal_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    user_id = db.Column(db.BigInteger(), 
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    title = db.Column(db.String(1024),
                      nullable=False)
    goal = db.Column(Enum(GoalType),
                     nullable=False)
    numerical_value = db.Column(db.Float(),
                                nullable=False)
    units = db.Column(db.String(32),
                      nullable=False)
    description = db.Column(db.String(512),
                            nullable=True)
    goal_start_on = db.Column(db.DateTime(),
                              nullable=False) 
    goal_end_on = db.Column(db.DateTime(),
                            nullable=False)
    status = db.Column(Enum(Progress),
                       nullable=False)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)

class Trail(db.model):
    """Trail identifying information"""
    __tablename__ = 'trails'

    trail_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    trail_name = db.Column(db.String(256), 
                           nullable=False)
    description = db.Column(db.String(1024),
                            nullable=False)
    difficulty = db.Column(db.String(64),
                           nullable=False)
    distance_in_miles = db.Column(db.Float(),
                                  nullable=False)
    total_ascent = db.Column(db.Integer(),
                             nullable=True)
    total_descent = db.Column(db.Integer(),
                              nullable=True)
    location = db.Column(db.String(256),
                         nullable=False) 
    latitude = db.Column(db.Float(),
                         nullable=False)
    longitude = db.Column(db.Float(),
                          nullable=False)
    rating = db.Column(db.Float(),
                       nullable=True)

class TrailStatus(db.model):
    """Give trail status (quality / safety) information by trail id"""
    __tablename__ = 'status_of_trails'

    trail_id = db.Column(db.BigInteger(), 
                         autoincrement=True,
                         db.ForeignKey('status_of_trails.trail_id'), 
                         primary_key=True,
                         nullable=False)
    status = db.Column(db.String(256),
                       nullable=False)
    description = db.Column(db.String(1024),
                            nullable=False)
    status_at = db.Column(db.DateTime(),
                          nullable=False)

class Hike(db.model):
    """An instance of going on a trail of movement activity"""
    __tablename__ = 'hikes'
    
    hike_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    user_id = db.Column(db.BigInteger(), 
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    trail_id = db.Column(db.BigInteger(), 
                         db.ForeignKey('trails.trail_id'),
                         nullable=True)
    status = db.Column(Enum(Progress),
                       nullable=False)
    details = db.Column(db.String(1024),
                        nullable=True)
    hiked_on = db.Column(db.DateTime(),
                         nullable=True)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)

class ResultRating(enum.Enum):
    very_easy = 1
    easy = 2
    average = 3
    difficult = 4
    very_difficult = 5

class HikeResult(db.model):
    """Results of a hike instance"""
    __tablename__ = 'hike_results'

    result_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    hike_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        db.ForeignKey('hikes.hike_id'),
                        nullable=False)
    description = db.Column(db.String(1024),
                            nullable=True)
    ascent_rating = db.Column(Enum(HikeResult),
                              nullable=True)
    distance_rating = db.Column(Enum(HikeResult),
                                nullable=False)
    challenge_rating = db.Column(Enum(HikeResult),
                                 nullable=False)
    hike_time = db.Column(db.Float(),
                          nullable=False)
    image_url = db.Column(db.String(1024)
                          nullable=True)
    cenceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)