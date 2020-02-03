from flask import Flask, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
import json
from sqlalchemy import func
from model import User, Goal, Trail, TrailStatus, Hike, HikeResult, connect_to_db, db
from datetime import datetime
import jinja2
import re

app = Flask(__name__)

# A secret key is needed to use Flask sessioning features

# To-do: make actual key and store locally until full deployment
app.secret_key = 'this-should-be-something-unguessable'
app.jinja_env.undefined = jinja2.StrictUndefined

@app.route("/")
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")

# @app.route("/login", methods=["GET"])


# @app.route("/login", methods=["POST"])
# def login_to_site():
#     """Take in user credentials and compare to existing if available"""

# @app.route("/signup", methods=["POST"])
# def intake_user_info():
#     """Add new user information to the users DB """


# @app.route("/profile", methods=["GET"])
# def show_profile():
#     """Loads a user's profile from initial intake info"""

# # add option to change this later

# @app.route("/trails", methods=["POST"])
# def show_search_form():
#     """Shows a form to search API for trails given a 
#         - specific zipcode,
#         - distance from zipcode,
#         - trail name (? see if compatible with api get requests?)
#         - trail difficulty
#         - max trail distance (miles)
#     """

# @app.route("/trails", methods=["GET"])
# def load_search_results():
#     """shows results from API for trails available given specifications"""

# @app.route("/goals", methods=["POST"])
# def change_goals():
#     """Add, modify, or cancel a selected, active goal"""

# @app.route("/goals", methods=["GET"])
# def show_current_goals_and_progress():
#     """View active goals and see graphs for current progress towards the goal"""

# @app.route("/hikes", methods=["GET"])
# def show_current_hikes():
#     """Show a list of all hikes assocatied with the user:
#         - status of each hike
#         - links to edit status
#         - link to add/ modify results if complete"""

# @app.route("/hikes", methods=["POST"])
# def add_hike():
#     """Add a trail to a list of hikes the user wants to go on;
#        if trail is already in hikes and is not complete display an alert that
#        hike is already in list"""

# @app.route("/results", methods=["GET"])
# def show_completed_hike_results():
#     """Shows """

# @app.route("/results", methods=["POST"])
# def add_hike_result():
#     """Posts any changes to or adds a hike result for a completed hike"""

# @app.route("/about")
# def show_about_page():
#     return render_template("about.html")

if __name__ == "__main__":
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')


