'use strict';

class Hike extends React.Component {
  constructor(props) {
    super(props);
    this.onViewResults = this.onViewResults.bind(this);
    this.onCompleteHike = this.onCompleteHike.bind(this);
    this.onCancelHike = this.onCancelHike.bind(this);
  // this.props.onUpdate;
  // this.props.renderForm(data);
  }
  
  onViewResults(event) {
    const hikeId = this.props.hikeId;
    const type = 'existing';
    const data = {hikeId: hikeId,
                  type: type};
    this.props.renderForm(data);
  }
  
  onCompleteHike(event) {
    const hikeId = this.props.hikeId;
    const type = 'new';
    const data = {hikeId: hikeId,
                  type: type};
    $.post('/api/complete_hike', data, (response) => {
      alert(response);
      this.props.renderForm(data);
    });
  }
  
  onCancelHike() {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    $.post('/api/cancel_hike', data, (response) => {
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
            <button class='add' onClick={this.onCompleteHike}><b>Complete</b></button>
            <button class='submit' onClick={this.onCancelHike}><b>Cancel</b></button>
          </p>
        </div>
        );
    } else if (isComplete === true) {
      return (
        <div>
          <h4>{trailName}</h4> {trailDescription}
          <p>
            <button class='submit' onClick={this.onViewResults}><b>View Results</b></button>
            <button class='submit' onClick={this.onCancelHike}><b>Cancel</b></button>
          </p>
        </div>
        );
    };
  };
}