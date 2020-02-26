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
    let result_data = {title: title,
                       goalType: goalType,
                       numericalValue: numericalValue,
                       description: description
                      };
    console.log(result_data);
    // pass up to some function likely in goals view to change what is seen   
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
 
  handleSubmit(event) {
    event.preventDefault();
    this.props.onCheckHikes(this.state.type);
  }
  
  render() {
    return(
      <form>
        <h3>Add a new goal:</h3>
        <label>
          Goal Title:<input type="text" name="title" required />
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
          Amount:<input type="number" name="numericalValue"/>
        </label>
        <br/>
        <label>
          Description:<input type="text" name="description"/>
        </label>
        <br/>
        <button onClick={this.handleSubmit}> Submit</button>
      </form>
    );
  }
}