"use strict";

class TrailsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state={results:undefined,
                quote:undefined}
    this.onTrailSearch = this.onTrailSearch.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }
  
  onTrailSearch(searchParams) {
    $.post('/api/trails', searchParams, (response) => {
      this.setState({results:response});
    });
  }
  
  getQuote() {
    $.get('/api/quote', (response) => {
      this.setState({quote:response.quote})
    })
  }
  
  componentWillMount() {
    this.getQuote()
  }
  
  render() {
    return(
      <div>
        <h3> Trail Search: </h3>
        <TrailsForm searchTrails={this.onTrailSearch} />
        <hr/>
        <TrailsResults trails={this.state.results} quote={this.state.quote}/>
      </div>
    );
  }
}