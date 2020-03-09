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
      const type = typeof(response);
      if (type == "string") {
        alert(response)
      } else {
        this.setState({results:response});
      }
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
        <h3>Find your trail</h3>
        <div class="form">
          <TrailsForm searchTrails={this.onTrailSearch} />
        </div>
        <hr/>
        <div class="results">
          <TrailsResults trails={this.state.results} 
                         quote={this.state.quote}/>
        </div>
      </div>
    );
  }
}