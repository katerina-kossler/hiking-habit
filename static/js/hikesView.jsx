'use strict';

class HikesView extends React.Component {
  constructor(props) {
    super(props);
    this.state={results: undefined,
                filter: undefined,
                showForm: false,
                newResultFrom: undefined
              };
    this.onCheckHikes=this.onCheckHikes.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.renderForm=this.renderForm.bind(this);
    this.getTrailDetails=this.getTrailDetails.bind(this);
  }
  
  onCheckHikes(filter) {
    this.state.filter = filter;
    $.get('/api/hikes/', (response) => {
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
  
  onUpdate() {
    this.onCheckHikes(this.state.filter);
    this.setState({showForm:false})
  }
  
  getTrailDetails(hike) {
    const hikeId = hike;
    const data = {hikeId: hikeId};
    $.get('/api/trail_from_hike_id/', data, (response) => {
       console.log(response); // working to process response to send into the HikeResultForm
    });
  }
  
  
  renderForm(hike) {
    const hikeId = hike;
    this.setState({newResultFrom: hikeId,
                   showForm: true}); 
  }
  

  render() {
    let showForm = this.state.showForm;
    if (showForm) {
      let hikeId = this.state.newResultFrom;
      let trailDetails = this.getTrailDetails(hikeId);
      return(
        <div>
          <HikeResultForm hikeId={hikeId} onUpdate={this.onUpdate} trailDetails={trailDetails}/>
        </div>
      );
    } else {
      return(
        <div>
          <h3>Current Hikes</h3>
          <HikeForm checkHikes={this.onCheckHikes} onUpdate={this.onUpdate}/>
          <hr/>
          <CurrentHikes hikes={this.state.results} onUpdate={this.onUpdate} renderForm={this.renderForm}/>
        </div>
      );
    }
  }
}