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
          <h3 class="row justify-content-center" >Set Goals, Reach Peaks</h3> 
          <hr/>
          <GoalForm viewGoals={this.viewGoals} />
        </div>
      )
    } else {
      return (  
        <div>
          <h3 class="row justify-content-center">Set Goals, Reach Peaks</h3> 
          <div class="row justify-content-center">
            <button class="btn add" onClick={()=>{this.setState({view: 'add'})}}>Add a Goal</button>  
          </div>
          <hr/>
          <CurrentGoals goals={this.state.goals} viewGoals={this.viewGoals}/>
        </div>
      )
    };
  } 
}