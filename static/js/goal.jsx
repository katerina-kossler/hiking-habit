'use strict';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:undefined,
                  data:undefined};
    this.onCheckGoal=this.onCheckGoal.bind(this);
    this.onCancelGoal=this.onCancelGoal.bind(this);
    //this.props.goalId, title, type, numericalValue, 
    //           description, createdOn, status
  }
  
  onCheckGoal() {
    const goalId = this.props.goalId;
    const data = {goalId: goalId};
    $.get("/api/progress", data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alert(response);
      } else {
        this.setState({view: goalId,
                       data: response});
      }
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
        <div>
          <h3>{this.props.title}</h3>
          {this.props.description}
          <ul>
            <li>Type: {this.props.type}</li>
            <li>Goal: {this.props.numericalValue}</li>
          </ul>
          <Progress rawData={this.state.data} 
                    status={this.props.status}
                    goal={this.props.numericalValue} 
                    type={this.props.type}
                    createdOn={this.props.createdOn}/>
                    
          <button onClick={() => {this.setState({view:undefined})}}><b>Hide Progress</b></button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>{this.props.title}</h3>
          {this.props.description}
          <p>
            <button onClick={this.onCheckGoal}><b>View Details</b></button>
            <button onClick={this.onCancelGoal}><b>Cancel</b></button>
          </p>
        </div>
      ); 
    }
  }
}