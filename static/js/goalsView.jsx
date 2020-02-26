'use strict';
class GoalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:undefined,
                  goals:undefined};
    this.addGoal = this.addGoal.bind(this);
    this.viewGoals = this.viewGoals.bind(this);
  }
  
  addGoal() {
    this.setState({view:undefined});
  }
  
  viewGoals() {
    $.get('/api/goals', (response) => {
      console.log(response);
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
          <GoalForm addGoal={this.addGoal}/>
        </div>
      )
    } else {
      return (  
        <div>
          <CurrentGoals goals={this.state.goals}/>
          <button onClick={()=>{this.setState({view: 'add'})}}>Add a Goal</button>  
        </div>
      )
    };
  } 
}