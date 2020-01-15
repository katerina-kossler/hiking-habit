from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

### Classes to add: 

# Table users as U {
#   id long [pk, increment] // auto-increment
#   username varchar
#   email varchar
#   password varchar // hash their pasword and temp store hash
#   created_at timestamp
#   first_name varchar [not null]
#   last_name varchar [not null]
#   bio varchar
#   picture_url varchar
#   zipcode int
#   canceled_by_user boolean
# }

# Enum goal_type {
#   number_hikes
#   miles_hiked
#   feet_ascended
#   hikeable_miles [note: 'miles in one hike']
#   hike_difficulty
# }

# Enum progress {
#   not_started
#   in_progress
#   complete
# }

# Table goals {
#   id long [pk, increment] // auto-increment
#   user_id long [ref: > U.id] 
#   title varchar
#   goal goal_type
#   numerical_value float
#   units varchar
#   description varchar
#   goal_start_on datetime 
#   goal_end_on datetime
#   status status
#   canceled_by_user boolean
# }

# Table trails  [headercolor: #27ae60] {
#   id long [pk, increment] // auto-increment
#   trail_name varchar
#   description text
#   difficulty varchar
#   distance float // in miles
#   total_ascent int
#   total_descent int
#   location varchar
#   lat float
#   long float
#   rating int
# }

# Table trail_status  [headercolor: #27ae60] {
#   id long [pk, ref: - trails.id]
#   status varchar // unk, all clear, variety of issues
#   description varchar
#   status_at timestamp
# }

# Table hikes  [headercolor: #27ae60] {
#   id long [pk, increment] // auto-increment
#   user_id long [ref: > U.id]
#   trail_id long [ref: > trails.id]
#   status varchar // 
#   details varchar 
#   hiked_on datetime [default: 'now()']
#   cenceled_by_user boolean
# }

# Table hike_results  [headercolor: #27ae60] {
#   id long [pk, increment] // auto-increment
#   hike_id long [ref: - hikes.id]
#   description text
#   ascent_rating int
#   distance_rating int
#   challenge_rating int
#   hike_time float // hrs
#   image_url varchar // url to an image
#   canceled_by_user boolean
# }