"use strict";

class HomepageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:<Trails/>};
    this.tryLogOut = this.tryLogOut.bind(this);
  }
  // has a this.props.userId
  
  tryLogOut() {
    $.get('/api/logout', (response) => {
      this.props.logUserOut();
    });
  };
  
  render() {
    return(
      <div>
        <div>
          <h2>Hiking Habit</h2>
        </div>
        <div>
          <button onClick={() => this.tryLogOut()}> Logout </button>
        </div>
        <hr/>
        <div>
          {this.props.userId}
        </div>
        <hr/>
        <ul>
          <li>
            <Link to='/trails'>Search for Trails</Link>
          </li>
          <li>
            <Link to='/hikes'>View Hikes</Link>
          </li>
          <li>
            <Link to='/goals'>View &amp; Edit Goals</Link>
          </li>
          <li>
            <Link to='/results'>View &amp; Edit Results </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path='/'>
            <Trails/>
          </Route>
          <Route path='/trails'>
            <Trails/>
          </Route>
          <Route path='/hikes'>
            <Hikes/>
          </Route>
          <Route path='/goals'>
            <Goals/>
          </Route>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/results'>
            <TrailResults/>
          </Route>
        </Switch>
        <hr/>
        <footer>
          <Link to='/about'>About</Link>
        </footer>
      </div>
    )
    
    
  }
}