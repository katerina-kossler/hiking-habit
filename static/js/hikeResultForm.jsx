'use strict';

class HikeResultForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {assessment: undefined,
                    distance: this.props.trailDetails.len,
                    hikedOn: undefined,
                    ascentRating: "AVERAGE",
                    distanceRating: "AVERAGE",
                    challengeRating: "AVERAGE",
                    hikeTime: undefined};
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.reformatDifficulty = this.reformatDifficulty.bind(this);
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
      alertify.error('Please enter the distance you hiked.')
    } else if (hikedOn === undefined) {
      alertify.error('Please enter the day you hiked.')
    } else if (distance < 0) {
      alertify.error('Please provide a positive length you hiked.')
    } else if (hikeTime < 0) {
      alertify.error('Please provide a positive amount of time.')
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
  
  reformatDifficulty() {
    let strDiff = this.props.trailDetails.difficulty;
    if (strDiff == 'green') {
      return 'Easy'
    } else if (strDiff == 'blue') {
      return 'Intermediate'
    } else if (strDiff == 'black') {
      return 'Difficult'
    } else {
      return this.props.diff
    }
  }
  
  render() {
    let difficulty = this.reformatDifficulty();
    const titleColor = 'list-group-item ' + difficulty;
    return(
      <div>
        <div class="row p-2">
          <div class="col-md-6">
              <ul class="list-group">
                <li class={titleColor}>{this.props.trailDetails.name}</li>
                <li class="list-group-item">{this.props.trailDetails.loc}</li>
                <li class="list-group-item">{this.props.trailDetails.summary}</li>
                <li class="list-group-item">Level: {difficulty}</li>
                <li class="list-group-item">Length: {this.props.trailDetails.len}mi</li>
                <li class="list-group-item">Ascent: {this.props.trailDetails.ascent}ft</li>
                <li class="list-group-item">Status: {this.props.trailDetails.condStatus}</li>
              </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-group">
              <li class="list-group-item submit">Results:</li>
              <li class="list-group-item">
                <div class="row">
                  <label for="hikeResultAssess" class="col-sm-6 col-form-label text-center">
                    Assessment
                  </label>
                  <div class="input-group col-sm-6">
                    <input type="text" class="form-control"
                          id="hikeResultAssess"
                          placeholder="Notes on your hike"
                          name="assessment" 
                          size='50'
                          onChange={this.handleInput}/>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <label for="hikeResultDistance" class="col-sm-6 col-form-label text-center">
                    Distance (mi)
                  </label>
                  <div class="input-group col-sm-6">
                    <input type="number" class="form-control"
                          id="hikeResultDistance"
                          name="distance" 
                          placeholder={this.props.trailDetails.len}
                          onChange={this.handleInput}/>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <label for="hikeResultDate" class="col-sm-6 col-form-label text-center">
                    Date Hiked
                  </label>
                  <div class="input-group col-sm-6">
                    <input type="date" class="form-control"
                            id="hikeResultDate"
                            name="hikedOn" 
                            onChange={this.handleInput}/>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <label for="hikeResultTime" class="col-sm-6 col-form-label text-center">
                    Time Hiked (h)
                  </label>
                  <div class="input-group col-sm-6">
                    <input type="number" class="form-control"
                          id="hikeResultTime"
                          minlength="1" 
                          name="hikeTime" 
                          onChange={this.handleInput}/>
                  </div>
                </div>
              </li>
              <li class="list-group-item justify-content-center align-items-center">
                <h5 class="col-form-label text-center">
                  Rate the following:
                </h5>
                <div class="row">
                  <label for="hikeResultAscent" class="col-sm-6 col-form-label text-center">
                    The climb / ascent
                  </label>
                  <div class="col-sm-6">
                    <select name="ascentRating" id="hikeResultAscent"
                            class="form-control "onChange={this.handleInput}>
                      <option value="VERY_EASY">Very Easy</option>
                      <option value="EASY">Easy</option>
                      <option value="AVERAGE" selected>Average</option>
                      <option value="DIFFICULT">Difficult</option>
                      <option value="VERY_DIFFICULT">Very Difficult</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <label for="hikeResultDistance" class="col-sm-6 col-form-label text-center">
                    The distance
                  </label>
                  <div class="col-sm-6">
                    <select name="distanceRating" id="hikeResultDistance"
                            class="form-control "onChange={this.handleInput}>
                      <option value="VERY_EASY">Very Easy</option>
                      <option value="EASY">Easy</option>
                      <option value="AVERAGE" selected>Average</option>
                      <option value="DIFFICULT">Difficult</option>
                      <option value="VERY_DIFFICULT">Very Difficult</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <label for="hikeResultChallenge" class="col-sm-6 col-form-label text-center">
                    The rigor / challenge
                  </label>
                  <div class="col-sm-6">
                    <select name="challengeRating" id="hikeResultChallenge"
                            class="form-control "onChange={this.handleInput}>
                      <option value="VERY_EASY">Very Easy</option>
                      <option value="EASY">Easy</option>
                      <option value="AVERAGE" selected>Average</option>
                      <option value="DIFFICULT">Difficult</option>
                      <option value="VERY_DIFFICULT">Very Difficult</option>
                    </select>
                  </div>
                </div>
                <div class="row justify-content-center align-items-center">
                  <button class="add btn" onClick={this.handleSubmit}>
                        Submit
                  </button> 
                </div>
              </li>
            </ul> 

          </div>
        </div>
      </div>
    );
  }
}