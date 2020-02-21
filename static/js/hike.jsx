'use strict';

class Hike extends React.Component {
  constructor(props) {
    super(props);
    this.onViewResults = this.onViewResults.bind(this);
    this.onCompleteHike = this.onCompleteHike.bind(this);
    this.onCancelHike = this.onCancelHike.bind(this);
  // this.props.onUpdate;
  // this.props.renderForm(hikeId);
  }
  
  onViewResults(event) {
    console.log('view results')
  }
  
  onCompleteHike(event) {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    console.log('complete');
    $.post('/api/complete_hike/', data, (response) => {
      alert(response);
      this.props.renderForm(hikeId);
    });
  }
  
  onCancelHike(event) {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    console.log('cancel');
    $.post('/api/cancel_hike/', data, (response) => {
      alert(response);
      this.props.onUpdate();
      });
  }
  
  render() {
    const trailName = this.props.trailName;
    const trailDescription = this.props.trailDescription;
    const isComplete = this.props.isComplete;
    if (isComplete === false) {
      return (
        <div>
          <h4>{trailName}</h4> {trailDescription}
          <p>
            <button onClick={this.onCompleteHike}><b>Complete</b></button>
            <button onClick={this.onCancelHike}><b>Cancel</b></button>
          </p>
        </div>
        );
    } else if (isComplete === true) {
      return (
        <div>
          <h4>{trailName}</h4> ({trailDescription})
          <p>
            <button onClick={this.onViewResults}><b>View / Edit Results</b></button>
            <button onClick={this.onCancelHike}><b>Cancel</b></button>
          </p>
        </div>
        );
    };
  };
}