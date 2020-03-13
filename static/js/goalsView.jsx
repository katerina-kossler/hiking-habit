'use strict';
class GoalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:undefined,
                  goals:undefined};
    this.viewGoals = this.viewGoals.bind(this);
  }
  
  viewGoals() {
    $.get('/api/goals', (response) => {
      if (typeof response == "string") {
        alertify.error(response);
      } else {
        this.setState({goals:response,
                      view: undefined});
      };
    });
  }
  
  componentDidMount() {
    this.viewGoals();
  }
  
  render() {
    let view = this.state.view;
    if (view == 'add') {
      return (
        <div>
          <div class="headerImg justify-content-center align-items-center p-1" id="goals">
            <div class="row justify-content-center align-items-center">
              <h3 class="text-center">
                Set Goals, Reach Peaks
              </h3> 
            </div>
            <p></p>
          </div>
          <p></p>
          <div class="row justify-content-center align-items-center">
            <GoalForm viewGoals={this.viewGoals} />
          </div>
        </div>
      )
    } else {
      return (  
        <div>
          <div class="headerImg justify-content-center align-items-center p-1" id="goals">
            <div class="row justify-content-center align-items-center">
              <h3 class="text-center">
                Set Goals, Reach Peaks
              </h3> 
            </div>
            <div class="row justify-content-center align-items-center">
              <button class="btn add" onClick={()=>{this.setState({view: 'add'})}}>Add a Goal</button>  
            </div>
            <p></p>
          </div>
          <p></p>
          <div class="row justify-content-center align-items-center w-100">
            <CurrentGoals goals={this.state.goals} viewGoals={this.viewGoals}/>
          </div>

        </div>
      )
    };
  } 
}