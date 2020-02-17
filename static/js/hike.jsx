'use strict';

class Hike extends React.Component {
  constructor(props) {
    super(props);
    this.onViewResults = this.onViewResults.bind(this);
    this.onCompleteHike = this.onCompleteHike.bind(this);
    this.onCancelHike = this.onCancelHike.bind(this);
  }
  
  onViewResults() {
    console.log('view results')
  }
  
  onCompleteHike(hikeId) {
    console.log(hikeId);
    console.log('complete');
    console.log('make results and redirect to results form');
  }
  
  onCancelHike(hikeId) {
    console.log(hikeId);
    console.log('cancel');
  }
  
  render() {
    const hikeId = this.props.hikeId;
    const trailName = this.props.trailName;
    const trailDescription = this.props.trailDescription;
    const isComplete = this.props.isComplete;
    if (isComplete === false) {
      return (
        <div>
          <h4>{trailName}</h4> {trailDescription}
          <p>
            <button onClick={this.onCompleteHike(hikeId)}><b>Complete</b></button>
            <button onClick={this.onCancelHike(hikeId)}><b>Cancel</b></button>
          </p>
        </div>
        );
    } else if (isComplete === true) {
      return (
        <div>
          <h4>{trailName}</h4> ({trailDescription})
          <p>
            <button onClick={this.onViewResults}><b>View Results</b></button>
            <button onClick={this.onCancelHike(hikeId)}><b>Cancel</b></button>
          </p>
        </div>
        );
    };
  };
}