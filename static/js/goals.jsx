"use strict";

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.addGoal = this.addGoal.bind(this);
    this.viewGoals = this.viewGoals.bind(this);
  }
  
  addGoal() {
    
  }
  
  viewGoals() {
    
  }
  
  render() {
    return(
      <div>
        <div>
          <button onClick={() => <Redirect to='/goals/add'/>}>Add a goal</button>
          <button onClick={() => <Redirect to='/goals/all'/>}>View Goals</button>
        </div>
      <Switch>
        <Route path='/goals/add'>
          <goalForm/>
        </Route>
        <Route path='goals/all'>
          <CurrentGoals/>
        </Route>
      </Switch>
      </div>
    );
  }
}