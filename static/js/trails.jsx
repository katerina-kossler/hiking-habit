"use strict";

class Trails extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={ view:<TrailResults trails={undefined}/>};
    this.onTrailSearch = this.onTrailSearch.bind(this);
  }
  
  
  onTrailSearch(searchParams) {
    console.log(searchParams);
    $.post('/trails', searchParams, (response) => {
      this.setState({view: <TrailResults trails={response}/>})
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