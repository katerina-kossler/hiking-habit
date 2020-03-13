'use strict';

class HikesView extends React.Component {
  constructor(props) {
    super(props);
    this.state={currentFilter: undefined,
                results: undefined,
                showForm: undefined,
                resultFrom: undefined,
                trailDetails: undefined,
                resultDetails: undefined};
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
    this.setState({showForm: undefined,
                   resultFrom: undefined,
                   trailDetails: undefined,
                   resultDetails: undefined});
    this.onCheckHikes(this.state.currentFilter);
  }
  
  renderForm(data) {
    const hikeId = data.hikeId;
    const type = data.type;
    const hikeData = {hikeId: hikeId};
    if (type === 'new') {
      const showForm = 'new';
      $.get('/api/trail_from_hike_id', hikeData, (response) => {
        if (typeof(response) === 'string') {
          alertify.error(response);
        } else {
          const name = response.name;
          const summary = response.summary;
          const difficulty = response.difficulty;
          const loc = response.loc;
          const len = response.len;
          const ascent = response.asc;
          const condOn = response.date;
          const condStatus = response.status;
          const condDetails = response.details;
          const trailDetailsObject = {name: name,
                                      summary: summary,
                                      difficulty: difficulty,
                                      loc: loc,
                                      len: len,
                                      condOn: condOn,
                                      ascent: ascent,
                                      condStatus: condStatus,
                                      condDetails: condDetails};
          this.setState({trailDetails: trailDetailsObject,
                         resultFrom: hikeId,
                         showForm: showForm});
        };
      }); 
    } else {
      $.get('/api/hike_result_and_trail_by_id', hikeData, (response) => {
        if (typeof(response) === 'string') {
          this.setState({showForm: 'new'});
        } else {
          const name = response.name;
          const summary = response.summary;
          const difficulty = response.difficulty;
          const loc = response.loc;
          const len = response.len;
          const ascent = response.asc;
          const condOn = response.date;
          const condStatus = response.status;
          const condDetails = response.details;
          const assessment = response.assessment;
          const distance = response.distance;
          const hikedOn = response.hikedOn;
          const ascentRating = response.ascentRating;
          const distanceRating = response.distanceRating;
          const challengeRating = response.challengeRating;
          const hikeTime = response.hikeTime;
          const trailDetailsObject = {name: name,
                                      summary: summary,
                                      difficulty: difficulty,
                                      loc: loc,
                                      len: len,
                                      ascent: ascent,
                                      condOn: condOn,
                                      condStatus: condStatus,
                                      condDetails: condDetails
                                    };
          const resultDetailsObject = {assessment: assessment,
                                       distance: distance,
                                       hikedOn: hikedOn,
                                       ascentRating: ascentRating,
                                       distanceRating: distanceRating,
                                       challengeRating: challengeRating,
                                       hikeTime: hikeTime};
          this.setState({trailDetails: trailDetailsObject,
                          resultDetails: resultDetailsObject,
                          resultFrom: hikeId,
                          showForm: 'existing'});
        }
      });
    };
  }
  
  onSubmitResultsForm(data) {
    $.post('/api/hike_result', data, (response) => {
      if ((typeof(response)) === 'string') {
        alertify.error(response);
      };
    });
    this.onUpdate();
  }
  
  componentDidMount() {
    this.onCheckHikes('all');
  }
  
  render() {
    let showForm = this.state.showForm;
    let hikeId = this.state.resultFrom;
    let trailDetails = this.state.trailDetails;
    let resultDetails = this.state.resultDetails;
    let results = this.state.results;
    if (showForm === 'new') {
      return(
        <div>
          <div class="row justify-content-center align-items-center">
            <h3>Active Adventures</h3>
          </div>
          <hr/>
          <HikeResultForm hikeId={hikeId} 
                          onSubmitResultsForm={this.onSubmitResultsForm} 
                          trailDetails={trailDetails}/>
        </div>
      );
    } else if (showForm === 'existing') {
      return(
        <div class="headerImg" id="hikes">
          <div class="row justify-content-center align-items-center">
            <h3>Active Adventures</h3>
          </div>
          <hr/>
          <Result hikeId={hikeId}
                  trailDetails={trailDetails}
                  resultDetails={resultDetails} 
                  onUpdate={this.onUpdate}/>
        </div>
      );
      
    } else {
      return(
        <div class="headerImg" id="hikes">
          <div class="row justify-content-center align-items-center">
            <h3>Active Adventures</h3>
          </div>
          <div class="row justify-content-center align-items-center">
            <div class="col-2">
              <HikeForm class="w-100 align-items-center" onCheckHikes={this.onCheckHikes} onUpdate={this.onUpdate}/>
            </div>
          </div>
          <div class="row justify-content-center align-items-center">
            <CurrentHikes hikes={results} 
                          onUpdate={this.onUpdate} 
                          renderForm={this.renderForm}/>
          </div>
        </div>
      );
    }
  }
}