from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")

@app.route("/Trails"):
def show_search_form():
    """Shows a form to search API for trails given a 
        - specific zipcode,
        - distance from zipcode,
        - trail name (? see if compatible with api get requests?)
        - trail difficulty
        - max trail distance (miles)

    """

def load_search_results():
    """"""

@app.route("/Hikes"):


@app.route("/HikeResults"):

@app.route("/Goals"):

@app.route("/Login"):





if __name__ == "__main__":
    app.run(debug=True)