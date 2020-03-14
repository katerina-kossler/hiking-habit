# Hiking Habit

# Motivation
* [Features](#features)
* [The Stack](#techstack)
* [Set-up & Installation](#installation)
* [Version 2.0](#v2)
* [How to Contribute](#contributions)

- screenshots / gifs of accessing site
- steps to get app up and running
features
- info on seeding, etc
- links to deployed project
- next steps
- how to contribute

hiking habit is a personal project built over the course of two months to gain experience building and fully deploying
a web-app. Hiking-habit was not built was the intention of building usual users or for comercial gain.

## <a name="features"></a>Features
**Users**
* User Registration & Log-in
**Trails**

## <a name="techstack"></a>The Stack
### Languages, Frameworks, Libraries, & Related Technologies
**Backend**
Python, Flask, SQLAlchemy, PostgreSQL, pgeocode
**Frontend**
Javascript, jQuery, React, React Router, Babel, Chart.js, Bootstrap, Alertify.js, Popper.js, Google Fonts, HTML5, CSS3
**APIs:**
REI's The Hiking Project

## <a name="installation"></a>Set-up & Installation
Install a code editor like [VS code](https://code.visualstudio.com/download)
Install [postgreSQL](https://www.postgresql.org/) for the database
Install [python3](https://www.python.org/downloads/mac-osx/)
Install the package installer for Python [pip](https://pip.pypa.io/en/stable/installing/)
Clone or fork repository:
```
$ git clone https://github.com/katerina-kossler/hiking-habit.git
```
Create and activate a virtual environment inside the 'hiking-habit' directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install dependencies:
```
$ pip install -r requirements.txt
```
Make an account with [The Hiking Project](https://www.hikingproject.com/) & go to the [API Page](https://www.hikingproject.com/data) to get your API key
Store this key in a file named 'secrets.sh'; do NOT check this file in using Git:
```
$ code secrets.sh
```
Create the hiking-habit database (uses postgreSQL):
```
$ createdb hiking-habit
```
Create all tables and relations in the database from the model in model.py:
```
$ python3 -i model.py
>>> db.create_all()
>>> quit()
```
Run the app from the command line:
```
$ python server.py
```
Hike!