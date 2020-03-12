'use strict';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.onAddHike = this.onAddHike.bind(this);
    this.reformatDifficulty = this.reformatDifficulty.bind(this);
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
  
  reformatDifficulty() {
    let strDiff = this.props.diff;
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
    const cardColor = "card " + this.props.diff;
    let difficulty = this.reformatDifficulty();
    if (this.props.stat == 'Unknown') {
      return(
        <div className={cardColor} onClick={this.onAddHike}>
          <div class="trail-content">
            <h4 class="card-title">{this.props.name}</h4>
            <h6 class="card-subtitle">{this.props.loc}</h6>
            <p class="card-text">{this.props.sum}</p>
            <ul class="list-group list-group-flush" id={this.props.apiId}>
              <li class="list-group-item">
                Level: {difficulty}
              </li>
              <li class="list-group-item">
                Location: ({this.props.lat}&deg;, {this.props.lng}&deg;)
              </li>
              <li class="list-group-item">
                Length: {this.props.len}mi
              </li>
              <li class="list-group-item">
                Ascent: {this.props.asc}ft / Descent: {this.props.dsc}ft 
              </li>
            </ul>
          </div>
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
          <div className={cardColor} onClick={this.onAddHike}>
            <div class="trail-content">
              <h4 class="card-title">{this.props.name}</h4>
              <h6 class="card-subtitle">{this.props.loc}</h6>
              <p class="card-text">{this.props.sum}</p>
              <ul class="list-group list-group-flush" id={this.props.apiId}>
                <li class="list-group-item">
                  Level: {difficulty}
                </li>
                <li class="list-group-item">
                  Location: ({this.props.lat}&deg;, {this.props.lng}&deg;)
                </li>
                <li class="list-group-item">
                  Length: {this.props.len}mi
                </li>
                <li class="list-group-item">
                  Ascent: {this.props.asc}ft / Descent: {this.props.dsc}ft 
                </li>
              </ul>
            </div>
            <div class="card-footer justify-content-center">
              <small class="text-muted">
                {this.props.stat} on {formattedDate}
              </small>
            </div>
          </div>
          );
      } else {
        return(
          <div className={cardColor} onClick={this.onAddHike}>
            <div class="trail-content">
              <h4 class="card-title">{this.props.name}</h4>
              <h6 class="card-subtitle">{this.props.loc}</h6>
              <p class="card-text">{this.props.sum}</p>
              <ul class="list-group list-group-flush" id={this.props.apiId}>
                <li class="list-group-item">
                  Level: {difficulty}
                </li>
                <li class="list-group-item">
                  Location: ({this.props.lat}&deg;, {this.props.lng}&deg;)
                </li>
                <li class="list-group-item">
                  Length: {this.props.len}mi
                </li>
                <li class="list-group-item">
                  Ascent: {this.props.asc}ft / Descent: {this.props.dsc}ft 
                </li>
              </ul>
            </div>
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