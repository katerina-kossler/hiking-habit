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
      <div>
        <h4>{this.props.name}</h4> ({this.props.loc})
        <ul>
          <li><b>Summary: </b>{this.props.sum}</li>
          <li><b>Difficulty: </b>{this.props.diff}</li>
          <li><b>Coordinates (lat, long): </b>{this.props.lat}, {this.props.lng}</li>
          <li><b>Length (mi): </b>{this.props.len}</li>
          <li><b>Ascent (ft): </b>{this.props.asc}</li>
          <li><b>Descent (ft): </b>{this.props.dsc}</li>
          <li><b>Status: </b> {this.props.stat}</li>
        </ul>
        <button onClick={this.onAddHike}><b>Hike it!</b></button>
      </div>
      );
    } else {
      const formattedDate = this.formatDate(this.props.date);
      if (this.props.stat == 'All Clear') {
        return(
          <div>
            <h4>{this.props.name}</h4> ({this.props.loc})
            <ul id={this.props.apiId}>
              <li><b>Summary: </b>{this.props.sum}</li>
              <li><b>Difficulty: </b>{this.props.diff}</li>
              <li><b>Coordinates (lat, long): </b>{this.props.lat}, {this.props.lng}</li>
              <li><b>Length (mi): </b>{this.props.len}</li>
              <li><b>Ascent (ft): </b>{this.props.asc}</li>
              <li><b>Descent (ft): </b>{this.props.dsc}</li>
              <li><b>Status: </b>{this.props.stat} on {formattedDate}</li>
            </ul>
            <button onClick={this.onAddHike}><b>Hike it!</b></button>
          </div>
          );
      } else {
        return(
          <div>
            <h4>{this.props.name}</h4> ({this.props.loc})
            <ul id={this.props.apiId}>
              <li><b>Summary: </b>{this.props.sum}</li>
              <li><b>Difficulty: </b>{this.props.diff}</li>
              <li><b>Coordinates (lat, long): </b>{this.props.lat}, {this.props.lng}</li>
              <li><b>Length (mi): </b>{this.props.len}</li>
              <li><b>Ascent (ft): </b>{this.props.asc}</li>
              <li><b>Descent (ft): </b>{this.props.dsc}</li>
              <li><b>Status: </b>{this.props.stat} on {formattedDate}</li>
              <li><b>Details: </b> {this.props.det} </li>
            </ul>
            <button onClick={this.onAddHike}><b>Hike it!</b></button>
          </div>
        );
      }
    }
  }
}