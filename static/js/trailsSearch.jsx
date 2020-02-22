"use strict";

class TrailsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state={results:undefined}
    this.onTrailSearch = this.onTrailSearch.bind(this);
  }
  
  onTrailSearch(searchParams) {
    $.post('/api/trails', searchParams, (response) => {
      this.setState({results:response});
    });
  }
  
  render() {
    return(
      <div>
        <h3> Trail Search: </h3>
        <TrailsForm searchTrails={this.onTrailSearch} />
        <hr/>
        <TrailsResults trails={this.state.results} />
      </div>
    );
  }
}