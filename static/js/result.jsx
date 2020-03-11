'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
    // this.props.trailDetails
    // this.props.resultDetails
    // this.onUpdate
  }
  
  render() {
    return(
      <div>
        <div>
          <h3>{this.props.trailDetails.name}</h3> 
          {this.props.trailDetails.loc}
          <ul>
            <li><b>Summary: </b>{this.props.trailDetails.summary}</li>
            <li><b>Difficulty: </b>{this.props.trailDetails.difficulty}</li>
            <li><b>Length (mi): </b>{this.props.trailDetails.len}</li>
            <li><b>Ascent (ft): </b>{this.props.trailDetails.ascent}</li>
            <li><b>Status: </b> {this.props.trailDetails.condStatus}</li>
          </ul>
        </div>
        <h4>Results from {this.props.resultDetails.hikedOn}:</h4>
        <div>
          Assessment: {this.props.resultDetails.assessment}
          <br/>
          Distance: {this.props.resultDetails.distance}
          <br/>
          Time Hiked (h): {this.props.resultDetails.hikeTime}
          <br/>
          Ratings: <br/>
          <ul>
            <li>
              Ascent: {this.props.resultDetails.ascentRating}
            </li>
            <li>
              Distance: {this.props.resultDetails.distanceRating}
            </li>
            <li>
              Challenge: {this.props.resultDetails.challengeRating}
            </li>
          </ul>
        </div>
        <button class="submit btn" onClick={this.props.onUpdate}>Go back to hikes</button>
      </div>
    );
  }
}