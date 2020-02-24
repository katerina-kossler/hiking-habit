'use strict';

class HikesView extends React.Component {
  constructor(props) {
    super(props);
    this.state={currentFilter: undefined,
                results: undefined,
                showForm: undefined,
                newResultFrom: undefined,
                trailDetails: undefined
              };
    this.onCheckHikes=this.onCheckHikes.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.renderForm=this.renderForm.bind(this);
    this.onSubmitResultsForm=this.onSubmitResultsForm.bind(this);
  }
  
  onCheckHikes(filter) {
    $.get('/api/hikes', (response) => {
      const relevantHikes = [];
      if (filter === 'incomplete') {
        for (const hike of response) {
          if (hike.isComplete == false) {
            relevantHikes.push(hike);
          };
        }
        this.setState({results: relevantHikes,
                       currentFilter: filter});
      } else if (filter === 'complete') {
        for (const hike of response) {
          if (hike.isComplete == true) {
            relevantHikes.push(hike);
          };
        }
        this.setState({results: relevantHikes,
                       currentFilter: filter});
      } else if (filter === 'all') {
        this.setState({results: response,
                       currentFilter: filter});
      }
    });
  };
  
  onUpdate() {
    this.setState({showForm: false,
                    trailDetails: undefined});
    this.onCheckHikes(this.state.currentFilter);
  }
  
  renderForm(hike) {
    const hikeId = hike;
    const data = {hikeId: hikeId};
    $.get('/api/trail_from_hike_id', data, (response) => {
      if (typeof(response) === 'string') {
        alert(response);
      } else {
        const name = response.name;
        const summary = response.summary;
        const difficulty = response.difficulty;
        const loc = response.loc;
        const len = response.len;
        const condOn = response.date;
        const condStatus = response.status;
        const condDetails = response.details;
        const trailDetailsObject = {name: name,
                                    summary: summary,
                                    difficulty: difficulty,
                                    loc: loc,
                                    len: len,
                                    condOn: condOn,
                                    condStatus: condStatus,
                                    condDetails: condDetails
                                  };
        this.setState({trailDetails: trailDetailsObject,
                       newResultFrom: hikeId,
                       showForm:true});
        console.log(name);
      };
    });
  }
  
  onSubmitResultsForm(data) {
    console.log(data);
    // when the hike result form is submitted want to
    // - change showForm to false
    // - set filter to all
    // - check for hikes again (refresh)
    $.post('/api/hike_result', data, (response) => {
      if ((typeof(response)) === 'string') {
        alert(response);
      } else {
        //
      }
    });
    this.onUpdate();
    // should result in the hike result form being hidden again
    
    // this.setState({showFrom: false});
  }
  
  componentDidMount() {
    this.onCheckHikes('all');
  }
  
  render() {
    let showForm = this.state.showForm;
    if (showForm) {
      console.log(this.state.trailDetails.name);
      return(
        <div>
          <HikeResultForm hikeId={this.state.newResultFrom} 
                          onSubmitResultsForm={this.onSubmitResultsForm} 
                          trailDetails={this.state.trailDetails}/>
        </div>
      );
    } else {
      return(
        <div>
          <h3>Current Hikes</h3>
          <HikeForm onCheckHikes={this.onCheckHikes} onUpdate={this.onUpdate}/>
          <hr/>
          <CurrentHikes hikes={this.state.results} 
                        onUpdate={this.onUpdate} 
                        renderForm={this.renderForm}/>
        </div>
      );
    }
  }
}