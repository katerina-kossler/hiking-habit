class HomePage extends React.Component {

    render() {
    return (
      <div class='options'>
        <a href="/login">Log-in</a> |
        <a href="/register">Sign-up</a>
      </div>
    );
    }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined,
                   password: undefined}
    this.checkResult = this.checkResult.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  checkResult(response) {
      if (response === 'success') {
        ReactDOM.render(<App />, document.getElementById('app'));
        console.log(response);
      } else {
        this.setState({user: undefined,
                       password: undefined});
        console.log(response);
        this.forceUpdate();
      }
  }
  
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let user = this.state.user
    let password = this.state.password;
    
    let user_data = {
        user: this.state.user,
        password: this.state.password
    }
    
    $.post('/login', user_data, this.checkResult);
  }
    
  render() {
  return (
    <form>
    <label>
        Username or email:
        <input type="text" name="user" onChange={this.handleInput}/>
    </label>
    <label>
        Password:<input type="text" name="password" onChange={this.handleInput}/>
    </label>
    <button onClick={this.handleSubmit}> Login </button>
    </form>
  );
  }
}

class Logout extends React.Component {
  render() {  
    $.get('/logout', (response) => console.log(response));
    return (
      <div>Successfully logged Out</div>
    );
  }
}

class RegisterForm extends React.Component {
    render() {
    return (
        <div>Displays form and creates new users</div>
    );
    }
}

class NavBar extends React.Component {
    render() {
    return (
        <div> One day soon I will be a nav bar that only logged-in users can see (or will show limited info to not logged in users</div>
    )
    }
}

class TrailsSearch extends React.Component {
    render() {
    return(
        <div>Trails Search always displays; when searched also show results</div>
    );
    }
}

class TrailsResults extends React.Component {
  render() {
  return(
      <div>Trails Search always displays; when searched also show results</div>
  );
  }
}

class HikesPage extends React.Component {
    render() {
    return (
        <div>I will show all the current user hikes organized into is_complete is true and false with buttons to make true or to view results for completed hikes</div>
    );
    }
}

class HikeResultsPage extends React.Component {
  render() {
  return (
    <div>Here users will render me when they complete a hike or when they want to review a hike / adjust the results</div>
  );
  }
}

class GoalsPage extends React.Component {
  render() {
  return (
      <div></div>
  );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { currentUser: undefined,
                   currentPage: 0, 
                   pages: [<HomePage/>, //re-factoring login control?
                           <LoginForm/>,
                           <RegisterForm/>,
                           <Logout/>]
                 }
    this.checkUserLoggedIn = this.checkUserLoggedIn(this);
                 
  }
  
  checkUserLoggedIn(response) {
      if (response !== 'undefined') {
        this.setState({currentUser: response});
        console.log(this.state.currentUser);
      } else {
        console.log(response);
      }
  }
  
  componentDidMount() {
    $.get('/check_logged_in', this.checkUserLoggedIn);
  }
  
  render() {
  // how to continually check the page end for a session cookie to dynamically render or
  //  do I need to just have a different component the renders when no users are logged in
  
  if (this.state.currentUser) {
    return (
      <div>
        <div>
          <p>other pages</p>
          <button onClick={() => this.setState({currentPage: 0})}> Homepage </button>
          <button onClick={() => this.setState({currentPage: 3})}> Logout </button>
        </div>
        <div>
          {this.state.pages[this.state.currentPage]}
        </div>
      </div>
    );
  }
    
  return (
    <div>
      <title>Hiking Habit</title>
      <div>
        <button onClick={() => this.setState({currentPage: 0})}> Homepage </button>
        <button onClick={() => this.setState({currentPage: 1})}> Login </button>
        <button onClick={() => this.setState({currentPage: 2})}> Register </button>
      </div>
      <div>
        {this.state.pages[this.state.currentPage]}
      </div>
    </div>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));