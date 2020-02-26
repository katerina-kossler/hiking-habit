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
          <GoalForm viewGoals={this.viewGoals} />
        </div>
      )
    } else {
      return (  
        <div>
          <CurrentGoals goals={this.state.goals} viewGoals={this.viewGoals}/>
          <br/>
          <button onClick={()=>{this.setState({view: 'add'})}}>Add a Goal</button>  
        </div>
      )
    };
  } 
}