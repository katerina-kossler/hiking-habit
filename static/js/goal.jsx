'use strict';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:undefined,
                  data:undefined,
                  goalStatus:undefined};
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
        alertify.error(response);
      } else {
        this.setState({view: goalId,
                       data: response.hikeData,
                       goalStatus: response.goalStatus});
      }
    });
  }
  
  onCancelGoal() {
    const goalId = this.props.goalId;
    const data = {goalId: goalId};
    $.post('/api/cancel_goal', data, (response) => {
      alertify.success(response);
      this.props.viewGoals();
      });
  }
  
  render() {
    let view = this.state.view;
    if (view) {
      return(
        <ul class="list-group w-100 p-3 col-md-8">
          <li class="list-group-item flex-column align-items-start submit">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">{this.props.title}</h4>
              <small>{this.props.status}</small>
            </div>
          </li>
          <li class="list-group-item">
            {this.props.description}
          </li>
          <li class="list-group-item">
            Type: {this.props.type}
          </li>
          <li class="list-group-item">
            Goal: {this.props.numericalValue}
          </li>
          <li class="list-group-item">
            <Progress goalId={this.props.goalId}
                      rawData={this.state.data} 
                      status={this.state.goalStatus}
                      goal={this.props.numericalValue} 
                      type={this.props.type}
                      createdOn={this.props.createdOn}/>
            <br/>
            <div class="row justify-content-center align-items-center">
              <button class="submit btn" onClick={() => {this.setState({view:undefined})}}>Hide</button>
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <ul class="list-group w-100 p-3 col-md-8">
          <li class="list-group-item flex-column align-items-start submit">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">{this.props.title}</h4>
              <small>{this.props.status}</small>
            </div>
          </li>
          <li class="list-group-item flex-column align-items-start">
            {this.props.description}
            <br/>
            <div class="justify-content-between d-flex w-100">
                <button class="add btn" onClick={this.onCheckGoal}>Check Progress</button>
                <button class="submit btn" onClick={this.onCancelGoal}>Cancel</button>
            </div>
          </li>
        </ul>
      ); 
    }
  }
}