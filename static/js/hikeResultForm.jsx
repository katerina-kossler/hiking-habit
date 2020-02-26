'use strict';

class HikeResultForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {assessment: undefined,
                    distance: this.props.trailDetails.len,
                    hikedOn: undefined,
                    ascentRating: "VERY_EASY",
                    distanceRating: "VERY_EASY",
                    challengeRating: "VERY_EASY",
                    hikeTime: undefined};
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.props.onSubmitResultsForm
      // this.props.hikeId
      // this.props.trailDetails with:
        // name, summary, difficulty, loc,
        // len, condOn, condStatus, condDetails
  }
    
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const hikeId = this.props.hikeId;
    const assessment = this.state.assessment;
    const distance = this.state.distance;
    const hikedOn = this.state.hikedOn;
    const ascentRating = this.state.ascentRating;
    const distanceRating = this.state.distanceRating;
    const challengeRating = this.state.challengeRating;
    const hikeTime = this.state.hikeTime; 
    if (distance === undefined) {
      alert('Please enter the distance you hiked.')
    } else if (hikedOn === undefined) {
      alert('Please enter the day you hiked.')
    } else if (distance < 0) {
      alert('Please provide a positive length you hiked.')
    } else if (hikeTime < 0) {
      alert('Please provide a positive amount of time.')
    } else {
      let result_data = {hikeId: hikeId,
                        assessment: assessment,
                        distance: distance,
                        hikedOn: hikedOn,
                        ascentRating: ascentRating,
                        distanceRating: distanceRating,
                        challengeRating: challengeRating,
                        hikeTime: hikeTime};
      this.props.onSubmitResultsForm(result_data); 
    };
  }
  
  render() {
    return(
      <div>
        <h2>Trail Details: </h2>
        <div>
          <h4>{this.props.trailDetails.name}</h4> {this.props.trailDetails.loc}
          <ul>
            <li><b>Summary: </b>{this.props.trailDetails.summary}</li>
            <li><b>Difficulty: </b>{this.props.trailDetails.difficulty}</li>
            <li><b>Length (mi): </b>{this.props.trailDetails.len}</li>
            <li><b>Ascent (ft): </b> {this.props.trailDetails.ascent}</li>
            <li><b>Status: </b> {this.props.trailDetails.condStatus}</li>
            <li>
              <ul>
                <li>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <h2>Hike Results:</h2>
        <form>
          <label>
            Assessment:<input type="text" 
                              name="assessment" 
                              size='50'
                              onChange={this.handleInput}/>
          </label>
          <br/>
          <label>
            Distance Hiked (mi):<input type="number"
                                  name="distance" 
                                  placeholder={this.props.trailDetails.len}
                                  onChange={this.handleInput}/>
          </label>
          [default is full trail length]
          <br/>
          <label>
            Date Hiked:<input type="date" 
                              name="hikedOn" 
                              onChange={this.handleInput}/>
          </label>
          <br/>
          <label>
            Time Hiked (h):<input type="number" 
                                  minlength="1" 
                                  name="hikeTime" 
                                  onChange={this.handleInput}/>
          </label>
          <br/>
          <label>
            How were the following:
          </label>
          <br/>
          <label>
            The climb / ascent:
            <select name="ascentRating" onChange={this.handleInput}>
              <option value="VERY_EASY">Very Easy</option>
              <option value="EASY">Easy</option>
              <option value="AVERAGE">Average</option>
              <option value="DIFFICULT">Difficult</option>
              <option value="VERY_DIFFICULT">Very Difficult</option>
            </select>
          </label>
          <br/>
          <label>
            Distance:
            <select name="distanceRating" onChange={this.handleInput}>
              <option value="VERY_EASY">Very Easy</option>
              <option value="EASY">Easy</option>
              <option value="AVERAGE">Average</option>
              <option value="DIFFICULT">Difficult</option>
              <option value="VERY_DIFFICULT">Very Difficult</option>
            </select>
          </label>
          <br/>
          <label>
            The rigor / challenge of the trail:
            <select name="challengeRating" onChange={this.handleInput}>
              <option value="VERY_EASY">Very Easy</option>
              <option value="EASY">Easy</option>
              <option value="AVERAGE">Average</option>
              <option value="DIFFICULT">Difficult</option>
              <option value="VERY_DIFFICULT">Very Difficult</option>
            </select>
          </label>
          <br/>
          <button onClick={this.handleSubmit}> Register </button>
        </form>
      </div>
    );
  }
}