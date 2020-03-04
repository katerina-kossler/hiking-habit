'use strict';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:undefined};
    this.onCheckGoal=this.onCheckGoal.bind(this);
    this.onCancelGoal=this.onCancelGoal.bind(this);
    //this.props.goalId, title, type, numericalValue, 
    //           description, createdOn, status
  }
  
  onCheckGoal() {
    const goalId = this.props.goalId;
    const data = {goalId: goalId};
    $.get("/api/progress", data, (response) => {
      console.log(response);
    });
  }
  
  onCancelGoal() {
    const goalId = this.props.goalId;
    const data = {goalId: goalId};
    $.post('/api/cancel_goal', data, (response) => {
      alert(response);
      this.props.viewGoals();
      });
  }
  
  render() {
    let view = this.state.view;
    if (view) {
      return(
        <Progress goalId={this.props.goalId}/>
      )
    } else {
      return (
        <div>
          <h3>{this.props.title}</h3>
          {this.props.description}
          <p>
            <button onClick={this.onCheckGoal}><b>Check Progress</b></button>
            <button onClick={this.onCancelGoal}><b>Cancel</b></button>
          </p>
        </div>
      ); 
    }
  }
}