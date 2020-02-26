'use strict';
class GoalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:'all'};
    this.addGoal = this.addGoal.bind(this);
    this.viewGoals = this.viewGoals.bind(this);
  }
  
  addGoal() {
    
  }
  
  viewGoals() {
    console.log('view goals')
    $.get('api/goals', (response) => {
      console.log(response);
    });
  }
  
  onComponentDidMount() {
    this.viewGoals();
  }
  
  render() {
    let view = this.state.view;
    if (view == 'all') {
      return (  
        <div>
          <button onClick={()=>{this.setState({view: 'all'})}}>View Goals</button>  
          <button onClick={()=>{this.setState({view: 'add'})}}>Add Goal</button>  
          <CurrentGoals/>
        </div>
      )
    } else if (view == 'add') {
      return (
        <div>
          <button onClick={()=>{this.setState({view: 'all'})}}>View Goals</button>  
          <button onClick={()=>{this.setState({view: 'add'})}}>Add Goal</button>  
          <GoalForm addGoal={this.addGoal}/>
        </div>
      )
    };
  } 
}