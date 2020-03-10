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
        <div class="card">
          <div class="trail-content">
            <h4 class="card-title">{this.props.name}</h4>
            <h6 class="card-subtitle">{this.props.loc}</h6>
            <p class="card-text">{this.props.sum}</p>
            <ul id={this.props.apiId}>
              <li> Difficulty: {this.props.diff}</li>
              <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
              <li> Length (mi): {this.props.len}</li>
              <li> Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
            </ul>
          </div>
          <button class="btn add btn-primary w-100" onClick={this.onAddHike}>Hike it!</button>
          <div class="card-footer justify-content-center">
              <small class="text-muted">
                Trail Status Unknown
              </small>
            </div>
          
        </div>
      );
    } else {
      const formattedDate = this.formatDate(this.props.date);
      if (this.props.stat == 'All Clear') {
        return(
          <div class="card">
            <div class="trail-content">
              <h4 class="card-title">{this.props.name}</h4>
              <h6 class="card-subtitle">{this.props.loc}</h6>
              <p class="card-text">{this.props.sum}</p>
              <ul id={this.props.apiId}>
                <li> Difficulty: {this.props.diff}</li>
                <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
                <li> Length (mi): {this.props.len}</li>
                <li> Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
              </ul>
            </div>
            <button class="btn add btn-primary w-100" onClick={this.onAddHike}><b>Hike it!</b></button>
            <div class="card-footer justify-content-center">
              <small class="text-muted">
                {this.props.stat} on {formattedDate}
              </small>
            </div>
          </div>
          );
      } else {
        return(
          <div class="card">
            <div class="trail-content">
              <h4 class="card-title">{this.props.name}</h4>
              <h6 class="card-subtitle">{this.props.loc}</h6>
              <p class="card-text">{this.props.sum}</p>
              <ul id={this.props.apiId}>
                <li> Difficulty: {this.props.diff}</li>
                <li> Coords (lat, long): {this.props.lat}, {this.props.lng}</li>
                <li> Length (mi): {this.props.len}</li>
                <li> Ascent / Descent: {this.props.asc} ft /{this.props.dsc} ft</li>
              </ul>
            </div>
            <button class="btn add btn-primary w-100" onClick={this.onAddHike}><b>Hike it!</b></button>
            <div class="card-footer justify-content-center">
              <small class="text-muted">
                {this.props.stat} on {formattedDate}
                <p>Details: {this.props.det}</p>
              </small>
            </div>
            
          </div>
        );
      }
    }
  }
}