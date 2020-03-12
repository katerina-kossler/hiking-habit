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
        alert(response);
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
          <div class="row justify-content-center align-items-center">
            <h3 class="text-center">
              Set Goals, Reach Peaks
            </h3> 
          </div>
          <hr/>
          <div class="row justify-content-center align-items-center">
            <GoalForm viewGoals={this.viewGoals} />
          </div>
        </div>
      )
    } else {
      return (  
        <div>
          <div class="row justify-content-center align-items-center">
            <h3 class="text-center">
              Set Goals, Reach Peaks
            </h3> 
          </div>
          <div class="row justify-content-center align-items-center">
            <button class="btn add" onClick={()=>{this.setState({view: 'add'})}}>Add a Goal</button>  
          </div>
          <hr/>
          <div class="row">
            <CurrentGoals goals={this.state.goals} viewGoals={this.viewGoals}/>
          </div>

        </div>
      )
    };
  } 
}