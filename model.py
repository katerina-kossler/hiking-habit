import enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Need to add references between tables 


class User(db.Model):
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
    created_on = db.Column(db.DateTime(), 
                           nullable=False)
    first_name = db.Column(db.String(64), 
                           nullable=False)
    last_name = db.Column(db.String(64), 
                          nullable=False)
    image_url = db.Column(db.String(1024),
                          nullable=True)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)
    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<User user_id={self.user_id}
                    username={self.username}
                    email={self.email}
                    canceled_by_user={self.canceled_by_user}>"""

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

class Goal(db.Model):
    """General; hiking related goals"""
    __tablename__ = 'goals'

    goal_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    user_id = db.Column(db.BigInteger(), 
                        db.ForeignKey(User.user_id),
                        nullable=False)
    title = db.Column(db.String(1024),
                      nullable=False)
    goal = db.Column(db.Enum(GoalType),
                     nullable=False)
    numerical_value = db.Column(db.Float(),
                                nullable=False)
    description = db.Column(db.String(512),
                            nullable=True)
    goal_made_on = db.Column(db.DateTime(),
                              nullable=False) 
    status = db.Column(db.Enum(Progress),
                       nullable=False)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)
    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<Goal goal_id={self.goal_id}
                    user_id={self.user_id}
                    title={self.title}
                    status={self.status}>"""

class Trail(db.Model):
    """Trail identifying information"""
    __tablename__ = 'trails'

    trail_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    api_trail_id = db.Column(db.BigInteger(),
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
    api_rating = db.Column(db.Float(),
                       nullable=True)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<Trail trail_id={self.trail_id}
                    trail_name={self.trail_name}
                    distance_in_miles={self.distance_in_miles}>"""

class TrailStatus(db.Model):
    """Give trail status (quality / safety) information by trail id"""
    __tablename__ = 'status_of_trails'

    status_id = db.Column(db.BigInteger(), 
                         autoincrement=True,
                         primary_key=True,
                         nullable=False)
    trail_id = db.Column(db.BigInteger(),
                         db.ForeignKey(Trail.trail_id), 
                         nullable=False)
    api_trail_id = db.Column(db.BigInteger(), 
                             nullable=False)
    trail_status = db.Column(db.String(256),
                       nullable=True)
    trail_status_details = db.Column(db.String(1024),
                        nullable=True)
    trail_status_color = db.Column(db.String(256),
                                   nullable=True)
    trail_status_at = db.Column(db.DateTime(),
                          nullable=True)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<TrailStatus status_id={self.status_id}
                    trail_id={self.trail_id}
                    trail_status={self.trail_status}
                    trail_status_details={self.trail_status_details}
                    trail_status_color={self.trail_status_color}
                    trail_status_at={self.trail_status_at}>"""    

class Hike(db.Model):
    """An instance of going on a trail of movement activity"""
    __tablename__ = 'hikes'
    
    hike_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    user_id = db.Column(db.BigInteger(), 
                        db.ForeignKey(User.user_id),
                        nullable=False)
    trail_id = db.Column(db.BigInteger(), 
                         db.ForeignKey(Trail.trail_id),
                         nullable=True)
    status = db.Column(db.Enum(Progress),
                       nullable=False)
    details = db.Column(db.String(1024),
                        nullable=True)
    hiked_on = db.Column(db.DateTime(),
                         nullable=True)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<Hike hike_id={self.hike_id}
                    user_id={self.user_id}
                    trail_id={self.trail_id}
                    status={self.status}>"""

class ResultRating(enum.Enum):
    very_easy = 1
    easy = 2
    average = 3
    difficult = 4
    very_difficult = 5

class HikeResult(db.Model):
    """Results of a hike instance"""
    __tablename__ = 'hike_results'

    result_id = db.Column(db.BigInteger(), 
                        autoincrement=True, 
                        primary_key=True,
                        nullable=False)
    hike_id = db.Column(db.BigInteger(), 
                        db.ForeignKey(Hike.hike_id),
                        autoincrement=True,
                        nullable=False)
    assessment = db.Column(db.String(1024),
                            nullable=True)
    ascent_rating = db.Column(db.Enum(ResultRating),
                              nullable=False)
    distance_rating = db.Column(db.Enum(ResultRating),
                                nullable=False)
    challenge_rating = db.Column(db.Enum(ResultRating),
                                 nullable=False)
    hike_time = db.Column(db.Float(),
                          nullable=False)
    image_url = db.Column(db.String(1024),
                          nullable=True)
    canceled_by_user = db.Column(db.Boolean(), 
                                 nullable=False)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"""<HikeResult result_id={self.result_id}
                    hike_id={self.hike_id}
                    description={self.description}
                    distance_in_miles={self.distance_in_miles}
                    ascent_rating={self.ascent_rating}
                    distance_rating={self.distance_rating}
                    challenge_rating={self.challenge_rating}>"""


def connect_to_db(app):
    """Connect the database using Flask"""
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///hiking-habit'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    print("Connected to DB.")

