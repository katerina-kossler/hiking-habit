class GoalForm extends React.Component {
  constructor() {
    super();
    this.state = {title: undefined,
                  goalType: 'NUMBER_HIKES',
                  numericalValue: undefined,
                  description: undefined
                  }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.props.viewGoals
    }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title;
    const goalType = this.state.goalType;
    const numericalValue = this.state.numericalValue;
    const description = this.state.description;
    if (title == undefined) {
      alert("Please enter a title")
    } else if (numericalValue == undefined) {
      alert("Please enter a goal value")
    } else if (isNaN(numericalValue)) {
      alert("Please enter goal value in numbers")
    } else if (numericalValue < 0) {
      alert("Please enter a positive goal value")
    } else if (description == undefined) {
      alert("Please enter a goal description")
    } else {
      let result_data = {title: title,
                        type: goalType,
                        numericalValue: numericalValue,
                        description: description};
      $.post("/api/goals", result_data, (response) => {
        alert(response);
        this.props.viewGoals();
      });
    }
  }
  
  render() {
    return(
      <div>
        <h3>Add a new goal:</h3>
        <form>
          <label>
            Goal Title:<input type="text" name="title" required onChange={this.handleInput}/>
          </label>
          <br/>
          <label>
            Category:
            <select name="goalType" onChange={this.handleInput}>
              <option value="NUMBER_HIKES" defaultChecked>Number of Hikes Completed</option>
              <option value="MILES_HIKED">Total Miles Hiked</option>
              <option value="FEET_ASCENDED">Feet Climbed</option>
              <option value="HIKEABLE_MILES">Miles in a Hike Completed</option>
              <option value="HIKE_DIFFICULTY">Hike Difficulty</option>
            </select>
          </label>
          <br/>
          <label>
            Amount:<input type="number" name="numericalValue" onChange={this.handleInput}/>
          </label>
          <br/>
          <label>
            Description:<input type="text" name="description" onChange={this.handleInput}/>
          </label>
          <br/>
          <button onClick={this.handleSubmit}> Submit</button>
        </form>
        </div>
    );
  }
}