class GoalForm extends React.Component {
  constructor() {
    super();
    this.state = {title: undefined,
                  goalType: NUMBER_HIKES,
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
    // pass up to some function likely in goals view to change what is seen   
  }
  
  render() {
    <div>
      <form action="/goals" method="POST">
        <label>
          Goal Title:<input type="text" name="title" required />
        </label>
        <label>
          Category:
          <select name="goalType" onChange={this.handleInput}>
            <option value="NUMBER_HIKES" defaultChecked>Hikes Made</option>
            <option value="MILES_HIKED">Total Miles Hiked</option>
            <option value="FEET_ASCENDED">Feet CLimbed</option>
            <option value="HIKEABLE_MILES">Miles in a hike</option>
            <option value="HIKE_DIFFICULTY">Hike Difficulty</option>
          </select>
        </label>
        <label>
          Amount:<input type="number" name="numericalValue"/>
        </label>
        <label>
          Description:<input type="text" name="description"/>
        </label>
        <button onClick={this.handleSubmit}> Submit</button>
      </form>
    </div>
  }
}