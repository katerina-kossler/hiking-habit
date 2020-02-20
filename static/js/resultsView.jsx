'use strict';

class ResultsView extends React.Component {
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
          <button onClick={() => <Redirect to='/results/all'/>}>View all Results</button>
          <button onClick={() => <Redirect to='/results/add'/>}>Edit a hike Result</button>
          <button onClick={() => <Redirect to='/results/cancel'/>}>Cancel a hike Result</button>
        </div>
        <Switch>
          <Route path='/results/add'>
            <HikeResultForm/>
          </Route>
          <Route path='/results/edit'>
            <Redirect to='/results/add'/>
          </Route>
          <Route path='/results/all'>
            <HikeResults/>
          </Route>
        </Switch>
      </div>
    );
  }
}