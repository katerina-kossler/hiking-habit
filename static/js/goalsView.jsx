'use strict';
class GoalsView extends React.Component {
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
          <button onClick={() => {return <Redirect to='/goals/add'/>}}>Add a goal</button>
          <button onClick={() => {return <Redirect to='/goals/all'/>}}>View Goals</button>
        </div>
      <Switch>
        <Route exact path='/goals'>
          <div>
            Make a selection above.
          </div>
        </Route>
        <Route path='/goals/add'>
          <GoalForm/>
        </Route>
        <Route path='goals/all'>
          <CurrentGoals/>
        </Route>
      </Switch>
      </div>
    );
  }
}