class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { currentUser: undefined,
                   currentPage: 0, 
                  pages: [<RegisterForm/>,
                           <Logout/>]
                 }
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }
  
  onLoginSuccess(response) {
      if (response !== this.state.currentUser) {
        this.setState({currentUser: response,
                       currentPage: 2});
        console.log(this.state.currentUser);
      }
  }

  componentDidMount() {
    $.get('/check_current_user', this.onLoginSuccess);
  }
  
  render() {

  if (this.state.currentUser) {
    return (
      <div>
        <div>
          <button onClick={() => this.setState({currentPage: 2})}> Logout </button>
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
        <button onClick={() => this.setState({currentPage: 0})}> Login </button>
        <button onClick={() => this.setState({currentPage: 1})}> Register </button>
      </div>
      <div>
        {this.state.pages[this.state.currentPage]}
      </div>
    </div>
  );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined,
                   password: undefined};
    this.checkResult = this.checkResult.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  checkResult(response) {
      if (response === 'undefined') {
        this.setState({user: undefined,
                       password: undefined});
        console.log(response);
        this.forceUpdate();
      } else {
        this.props.onSuccess(response);
        console.log(response);
      }     
  }
  
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let user = this.state.user;
    let password = this.state.password;
    
    let user_data = {
        user: this.state.user,
        password: this.state.password
    };
    
    $.post('/login', user_data, (response) => {this.checkResult(response)});
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
  // current not correct!
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

// class NavBar extends React.Component {
//     render() {
//     return (
//         <div> One day soon I will be a nav bar that only logged-in users can see (or will show limited info to not logged in users</div>
//     )
//     }
// }

// class TrailsSearch extends React.Component {
//     render() {
//     return(
//         <div>Trails Search always displays; when searched also show results</div>
//     );
//     }
// }

// class TrailsResults extends React.Component {
//   render() {
//   return(
//       <div>Trails Search always displays; when searched also show results</div>
//   );
//   }
// }

// class HikesPage extends React.Component {
//     render() {
//     return (
//         <div>I will show all the current user hikes organized into is_complete is true and false with buttons to make true or to view results for completed hikes</div>
//     );
//     }
// }

// class HikeResultsPage extends React.Component {
//   render() {
//   return (
//     <div>Here users will render me when they complete a hike or when they want to review a hike / adjust the results</div>
//   );
//   }
// }

// class GoalsPage extends React.Component {
//   render() {
//   return (
//       <div></div>
//   );
//   }
// }

ReactDOM.render(<App />, document.getElementById('app'));