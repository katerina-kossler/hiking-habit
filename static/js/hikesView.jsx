'use strict';

class HikesView extends React.Component {
  constructor(props) {
    super(props);
    this.state={results:undefined};
    this.onCheckHikes=this.onCheckHikes.bind(this);
  }
  
  onCheckHikes(filter) {
    console.log(filter)
    $.get('/api/hikes', (response) => {
      const relevantHikes = [];
      if (filter === 'incomplete') {
        for (const hike of response) {
          if (hike.isComplete == false) {
            relevantHikes.push(hike);
          };
        }
        this.setState({results: relevantHikes});
      } else if (filter === 'complete') {
        for (const hike of response) {
          if (hike.isComplete == true) {
            relevantHikes.push(hike);
          };
        }
        this.setState({results: relevantHikes});
      } else if (filter == 'all') {
        this.setState({results:response});
      }
    });
  };
  
  render() {
    return(
      <div>
        <h3>Current Hikes</h3>
        <HikeForm checkHikes={this.onCheckHikes}/>
        <hr/>
        <CurrentHikes hikes={this.state.results}/>
      </div>
    );
  };
}