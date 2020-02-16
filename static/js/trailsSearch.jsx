"use strict";

class TrailsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onTrailSearch = this.onTrailSearch.bind(this);
  }
  
  onTrailSearch(searchParams) {
    $.post('/api/trails', searchParams, (response) => {
      this.setState({view: <TrailsResults trails={response}/>})
    });
  }
  
  render() {
    return(
      <div>
        <h3> Trail Search: </h3>
        <div>
          <TrailsForm searchTrails={this.onTrailSearch}/>
        </div>
        <hr/>
        <div>
          {this.state.view}
        </div>
      </div>
    );
  }
}