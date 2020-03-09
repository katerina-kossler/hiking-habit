'use strict';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.onAddHike = this.onAddHike.bind(this);
  }
  
  formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(Date.parse(dateString));
    return dateObj.toLocaleDateString(undefined, options)
  }
  
  onAddHike() {
    let data = {apiId: this.props.apiId};
    $.post('/api/hikes', data, (response) => {
      alert(response);
    });
  }
  
  render() {
    if (this.props.stat == 'Unknown') {
      return(
      <div class="col-sm-6">
        <div class="card">
          <h4 class="card-title">{this.props.name}</h4>
          <h6 class="card-subtitle">{this.props.loc}</h6>
          <p class="card-text">{this.props.sum}</p>
          <ul id={this.props.apiId}>
            <li> Difficulty: {this.props.diff}</li>
            <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
            <li>Length (mi): {this.props.len}</li>
            <li>Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
            <li>Status: {this.props.stat}</li>
          </ul>
          <button class="btn add btn-primary" onClick={this.onAddHike}>Hike it!</button>
        </div>
      </div>
      );
    } else {
      const formattedDate = this.formatDate(this.props.date);
      if (this.props.stat == 'All Clear') {
        return(
        <div class="col-sm-6">
          <div class="card">
            <h4 class="card-title">{this.props.name}</h4>
            <h6 class="card-subtitle">{this.props.loc}</h6>
            <p class="card-text">{this.props.sum}</p>
            <ul id={this.props.apiId}>
              <li> Difficulty: {this.props.diff}</li>
              <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
              <li>Length (mi): {this.props.len}</li>
              <li>Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
              <li>Status: {this.props.stat} on {formattedDate}</li>
            </ul>
            <button class="btn add btn-primary" onClick={this.onAddHike}><b>Hike it!</b></button>
          </div>
        </div>
          );
      } else {
        return(
        <div class="col-sm-6">
          <div class="card">
            <h4 class="card-title">{this.props.name}</h4>
            <h6 class="card-subtitle">{this.props.loc}</h6>
            <p class="card-text">{this.props.sum}</p>
            <ul id={this.props.apiId}>
              <li> Difficulty: {this.props.diff}</li>
              <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
              <li>Length (mi): {this.props.len}</li>
              <li>Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
              <li>Status: {this.props.stat} on {formattedDate}</li>
              <li>Details: {this.props.det} </li>
            </ul>
            <button class="btn add btn-primary" onClick={this.onAddHike}><b>Hike it!</b></button>
          </div>
        </div>
        );
      }
    }
  }
}