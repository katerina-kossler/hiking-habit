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
    this.checkIfLoggedIn(); 
  };
  
  tryRegistration = (data) => {
    $.post('/api/register', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alertify.error(response);
      } else {
        this.checkIfLoggedIn();
      }
    });
  }
  
  tryLogIn = (data) => {
    $.post('/api/login', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alertify.error(response);
      } else {
        this.checkIfLoggedIn();
      }
    });
  }

  onLogOut() {
    $.get('/api/logout', () => {
      this.setState({userId: undefined,
                    first: undefined,
                    last: undefined,
                    createdOn: undefined});
    });
  }
  
  checkIfLoggedIn() {
    if (this.state.userId == undefined) {
      $.get('/api/profile', (response) => {
        let type = typeof(response);
        if (type == 'string') {
          this.setState({userId: undefined,
                         first: undefined,
                         last: undefined,
                         createdOn: undefined});
        } else {
          const id = response.userId;
          const first = response.first;
          const last = response.last;
          const createdOn = response.createdOn;
          this.setState({userId: id,
                         first: first,
                         last: last,
                         createdOn: createdOn});
        }
      });
    };
  }
  
  render() {
    const loggedIn = this.state.userId;
    if (loggedIn) {
      return(
        <Router>
          <div>
            <nav class='navbar navbar-expand-md navbar-light bg-light'>
              <div class='container-fluid'>     
                <div>
                  <a class='navbar-brand' id='logo' href='/'>
                    Hiking Habit
                    <img class="mtn" src="/static/img/mountain.png"/>
                  </a>
                </div>
                <button class='navbar-toggler' 
                        type='button' 
                        data-toggle='collapse'
                        data-target='#navbarResponsive'>
                  <span class='navbar-toggler-icon'></span>          
                </button>
                <div class="collapse navbar-collapse" id='navbarResponsive'>
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <Link class="nav-link" to='/trails'>Search Trails</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to='/hikes'>Hikes</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to='/goals'>Goals</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to='/profile'>Profile</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to='/' onClick={this.onLogOut}>Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
              <div class="container p-5">
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
            </div>
            <footer class="fluid-container">
              <nav class="navbar fixed-bottom text-center bg-light py-3">
                <a href="https://katerinakossler.com/">Made by Katerina Kossler</a> 
                <Link to='/about'>About <img class="mtn" src="/static/img/mountain.png"/></Link>
              </nav>
            </footer>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <nav class='navbar navbar-expand-md navbar-light bg-light'>
              <div class='container-fluid'>     
                <a class='navbar-brand' id='logo' href='/'>Hiking Habit<img class="mtn" src="/static/img/mountain.png"/></a>
                <button class='navbar-toggler' 
                        type='button' 
                        data-toggle='collapse'
                        data-target='#navbarResponsive'>
                  <span class='navbar-toggler-icon'></span>          
                </button>
                <div class="collapse navbar-collapse" id='navbarResponsive'>
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><Link class="nav-link" to='/login'>Login</Link></li>
                    <li class="nav-item"><Link class="nav-link" to='/register'>Register</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
            <div class="container p-5">
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
            </div>
            <footer class="page-footer text-center bg-light py-3">
              <nav class="navbar fixed-bottom text-center bg-light py-3">
                <a href="https://katerinakossler.com/">Made by Katerina Kossler</a> 
                <Link to='/about'>About <img class="mtn" src="/static/img/mountain.png"/></Link>
              </nav>
            </footer>
          </div>
        </Router>
      );
    };
  };
}

ReactDOM.render(<App />, document.getElementById('app'));