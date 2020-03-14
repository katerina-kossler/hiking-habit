# Hiking Habit
Hiking Habit is a personal project built over the course of two months to gain experience designing, building and deploying full-stack web-application.<br/>
This project was inspired by my love of hiking and was built to help me track my progress as a novice hiker.<br/>
Hiking-habit was not built was the intention of building usual users or for comercial gain.<br/>

## Contents
* [Features](#features)
* [The Stack](#techstack)
* [Set-up & Installation](#installation)
* [Version 2.0](#v2)

## <a name="features"></a>Features
### General
* user registration, log-in, and basic profile
* reactive display & design
### Trails
* trail search based on zipcode and other optional criteria
* trail results display in a compact format with border coloring by difficulty <br/>

![](http://g.recordit.co/V678dQOBYx.gif)
### Hikes
* hike creation from trail search
* hike completion & cancelation
* hike result generation for completed hikes <br/>

![](http://g.recordit.co/SAUlZbIqTQ.gif)
### Goals
* goal creation & cancelation
* view progress (via completed hikes) towards different goals <br/>

![](http://g.recordit.co/rEg7f4VpNf.gif)

## <a name="techstack"></a>The Stack
###Languages, Frameworks, Libraries, & Related Technologies <br/>
**Backend**
Python, Flask, SQLAlchemy, PostgreSQL, pgeocode <br/>
**Frontend**
Javascript, jQuery, React, React Router, Babel, Chart.js, Bootstrap, Alertify.js, Popper.js, Google Fonts, HTML5, CSS3 <br/>
**APIs:**
REI's The Hiking Project

## <a name="installation"></a>Set-up & Installation
Install a code editor like [VS code](https://code.visualstudio.com/download).<br/>
Install [postgreSQL](https://www.postgresql.org/) for the relational database.<br/>
Install [python3](https://www.python.org/downloads/mac-osx/)<br/>
Install the package installer for Python [pip](https://pip.pypa.io/en/stable/installing/)<br/>
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
Make an account with [The Hiking Project](https://www.hikingproject.com/) & get an API key from the [API Page](https://www.hikingproject.com/data).<br/>
Store this key in a file named 'secrets.sh'; do NOT check this file in using Git:
```
$ code secrets.sh
```
Create the hiking-habit database (uses postgreSQL):
```
$ createdb hiking-habit
```
Create all tables and relations in the database (stored in model.py):
```
$ python3 -i model.py
>>> db.create_all()
>>> quit()
```
Run the app from the command line:
```
$ python server.py
```

## <a name="v2">Version 2.0</a>
In the next iteration of this project, I want to:
* Move the goal progress display to a progress dashboard
* Integrate a map display using the Google Maps Api to show markers for trail locations
* Futher streamline the styling and design of the app
* Include more information in a dashboard from the ratings in hike results to add another dimension of progress