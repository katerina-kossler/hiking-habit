"use strict";
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const Redirect = ReactRouterDOM.Redirect;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userId: undefined,
                  first: undefined,
                  last: undefined,
                  createdOn: undefined};
    this.tryRegistration=this.tryRegistration.bind(this);
    this.tryLogIn=this.tryLogIn.bind(this);
    this.onLogOut=this.onLogOut.bind(this);
    this.checkIfLoggedIn=this.checkIfLoggedIn.bind(this);
  };
  
  tryRegistration = (data) => {
    $.post('/api/register', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alert(response);
      } else {
        this.setState({userId: response.userId});
        this.checkIfLoggedIn();
      }
    });
  }
  
  tryLogIn = (data) => {
    $.post('/api/login', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alert(response);
      } else {
        let user = response.userId;
        this.setState({userId: response.userId});
      }
    });
  }

  onLogOut() {
    $.get('/api/logout', () => {
      this.setState({userId: undefined});
    });
  }
  
  checkIfLoggedIn() {
    $.get('/api/profile', (response) => {
      if (response.loggedIn == 'true') {
        const id = response.userId;
        const first = response.first;
        const last = response.last;
        const createdOn = response.createdOn;
        this.setState({userId: id,
                      first: first,
                      last: last,
                      createdOn: createdOn});
      } else {
        this.setState({userId: undefined,
                       first: undefined,
                       last: undefined,
                       createdOn: undefined
                    });
      }
    });
  }

  componentDidMount() {
    this.checkIfLoggedIn()  
  }
  
  render() {
    const loggedIn = this.state.userId;
    if (loggedIn) {
      return(
        <Router>
          <div>
            <div>
              <h2><Link to='/'>Hiking Habit</Link></h2>
            </div>
            <div>
              Welcome, {this.state.first} <button onClick={this.onLogOut}> Logout </button>

            </div>
            <hr/>
            <ul class='nav-bar'>
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
                <Link to='/profile'> Profile </Link>
              </li>
            </ul>
            <hr/>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/trails'/>
              </Route>
              <Route path='/trails'>
                <TrailsSearch/>
              </Route>
              <Route path='/hikes'>
                <HikesView/>
              </Route>
              <Route path='/goals'>
                <GoalsView/>
              </Route>
              <Route path='/profile'>
                <Profile first={this.state.first}
                         last={this.state.last}
                         createdOn={this.state.createdOn}/>
              </Route>
              <Route path='/about'>
                <About/>
              </Route>
              <Route> 
                <Redirect to='/'/>
              </Route>
            </Switch>
            <hr/>
            <footer>
              <Link to='/about'>About</Link>
            </footer>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <div>
              <h2>Hiking Habit</h2>
            </div>
            <ul class='nav-bar'>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
            <hr/>
            <Switch>
              <Route exact path='/'>
                <LoginForm submitLogIn={this.tryLogIn}/>
              </Route>
              <Route path='/login'>
                <LoginForm submitLogIn={this.tryLogIn}/>
              </Route>
              <Route path='/register'>
                <RegisterForm tryRegistration={this.tryRegistration}/>
              </Route>
              <Route path='/about'>
                <About/>
              </Route>
              <Route> 
                <Redirect to='/'/>
              </Route>
            </Switch>
            <hr/>
              <footer>
                <Link to='/about'>About</Link>
              </footer>
          </div>
        </Router>
      );
    };
  };
}

ReactDOM.render(<App />, document.getElementById('app'));