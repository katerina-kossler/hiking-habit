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
      alertify.success(response);
      this.props.renderForm(data);
    });
  }
  
  onCancelHike() {
    const hikeId = this.props.hikeId;
    const data = {hikeId: hikeId};
    $.post('/api/cancel_hike', data, (response) => {
      alertify.success(response);
      this.props.onUpdate();
      });
  }
  
  render() {
    const trailName = this.props.trailName;
    const trailDescription = this.props.trailDescription;
    const isComplete = this.props.isComplete;
    if (isComplete === false) {
      return (
        <div class="form-group display-flex col-md-6">
          <ul class="list-group w-100 p-3">
            <li class="list-group-item flex-column align-items-start">
              <h4 class="mb-1">{trailName}</h4>
              <p class="mb-1">{trailDescription}</p>
              <br/>
              <div class="justify-content-between d-flex w-80">
                <button class='add btn' onClick={this.onCompleteHike}><b>Complete</b></button>
                <button class='submit btn' onClick={this.onCancelHike}><b>Cancel</b></button>
              </div>
            </li>
          </ul>
        </div>
      );
    } else if (isComplete === true) {
      return (
      <div class="form-group display-flex col-sm-6">
        <ul class="list-group w-100 p-3">
          <li class="list-group-item flex-column align-items-start">
            <h4 class="mb-1">{trailName}</h4>
            <p class="mb-1">{trailDescription}</p>
            <br/>
            <div class="justify-content-between d-flex w-80">
              <button class='submit btn' onClick={this.onViewResults}><b>View Results</b></button>
              <button class='submit btn' onClick={this.onCancelHike}><b>Cancel</b></button>
            </div>
          </li>
        </ul>
      </div>
      );
    };
  };
}