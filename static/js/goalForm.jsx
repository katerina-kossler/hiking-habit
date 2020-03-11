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
        <h4 class="text-center">Let's sketch this out</h4>
        <form>
          <div class="form-group row">
            <label for="goalFormTitle" class="col-sm-4 col-form-label text-center">
              Title
            </label>
            <div class="input-group col-sm-8">
              <input type="text" class="form-control"
                    id="goalFormTitle" 
                    name="title" required onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="goalFormType" class="col-sm-4 col-form-label text-center">
              Type
            </label>
            <div class="input-group col-sm-8">
              <select name="goalType" class="form-control"
                      id="goalFormType" onChange={this.handleInput}>
                <option value="NUMBER_HIKES" defaultChecked>Number of Hikes Completed</option>
                <option value="MILES_HIKED">Total Miles Hiked</option>
                <option value="FEET_ASCENDED">Feet Climbed</option>
                <option value="HIKEABLE_MILES">Miles in a Hike Completed</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="goalFormGoal" class="col-sm-4 col-form-label text-center">
              Goal
            </label>
            <div class="input-group col-sm-8">
              <input type="number" name="numericalValue" 
                    id="goalFormGoal" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="goalFormDesc" class="col-sm-4 col-form-label text-center">
              Description
            </label>
            <div class="input-group col-sm-8">
              <input type="text" name="description" onChange={this.handleInput}/>
            </div>
          </div>
          <button class="add btn mx-auto" onClick={this.handleSubmit}> Submit</button>
        </form>
        </div>
    );
  }
}