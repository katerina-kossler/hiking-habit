"use strict";

class HomepageNoUser extends React.Component {
  constructor() {
    super();
    this.tryLogIn=this.tryLogIn.bind(this);
    this.tryRegistration=this.tryRegistration.bind(this);
    
  }
  
  tryRegistration = (data) => {
    console.log(data);
    $.post('/api/register', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alert(response);
      } else {
        let user = response.userId;
        this.props.logUserIn(user);
      }
    });
  };
  
  tryLogIn = (data) => {
    $.post('/api/login', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        alert(response);
      } else {
        
        let user = response.userId;
        this.props.logUserIn(user);
      }
    });
  };
  
  render() {
  return (
    <div>
      <div>
        <h2>Hiking Habit</h2>
      </div>
      <hr/>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
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
      </Switch>
      <hr/>
        <footer>
          <Link to='/about'>About</Link>
        </footer>
    </div>
  );
  }
}