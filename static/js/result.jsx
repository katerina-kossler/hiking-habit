'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.reformatDifficulty = this.reformatDifficulty.bind(this);
    // this.props.trailDetails
    // this.props.resultDetails
    // this.onUpdate
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
        <div class="row">
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
              <li class="list-group-item submit">Results from {this.props.resultDetails.hikedOn}</li>
              <li class="list-group-item">Assessment: {this.props.resultDetails.assessment}</li>
              <li class="list-group-item">Distance: {this.props.resultDetails.distance}</li>
              <li class="list-group-item">Distance: {this.props.resultDetails.distance}</li>
              <li class="list-group-item">Time Hiked (h): {this.props.resultDetails.hikeTime}</li>
              <li class="list-group-item">
                <h5>Ratings:</h5>
                <div class="justify-content-left align-items-center"><p>- Ascent: {this.props.resultDetails.ascentRating}</p></div>
                <div class="justify-content-left align-items-center"><p>- Distance: {this.props.resultDetails.distanceRating}</p></div>
                <div class="justify-content-left align-items-center"><p>- Challenge: {this.props.resultDetails.challengeRating}</p></div>
                <div class="row justify-content-center align-items-center">
                  <button class="submit btn" onClick={this.props.onUpdate}>
                    Go back to hikes
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