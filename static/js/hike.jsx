'use strict';

class Hike extends React.Component {
  constructor(props) {
    super(props);
    this.onViewResults = this.onViewResults.bind(this);
    this.onCompleteHike = this.onCompleteHike.bind(this);
    this.onCancelHike = this.onCancelHike.bind(this);
  }
  
  onViewResults(event) {
    console.log('view results')
  }
  
  onCompleteHike(event) {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    console.log('complete');
    $.post('/api/complete_hike', data, (response) => {
      alert(response);
    });
    // complete works in server, need to figure out how to redirect to resultsForm with this hike's
    // info passed in as props
    <Redirect to='/results/add' />
  }
  
  onCancelHike(event) {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    console.log('cancel');
    $.post('/api/cancel_hike', data, (response) => {
      alert(response);
    });
  }
  // issue where currently all of these are executing upon loading
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
            <button onClick={this.onViewResults}><b>View Results</b></button>
            <button onClick={this.onCancelHike}><b>Cancel</b></button>
          </p>
        </div>
        );
    };
  };
}