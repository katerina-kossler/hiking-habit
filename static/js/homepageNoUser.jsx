"use strict";

class HomepageNoUser extends React.Component {
  constructor() {
    super();
    this.state = {view: <LoginForm submitLogIn={this.tryLogIn}/>};
    this.tryLogIn=this.tryLogIn.bind(this);
    this.tryRegistration=this.tryRegistration.bind(this);
    
  }
  
  tryRegistration = (data) => {
    console.log(data);
    $.post('/api/register', data, (response) => {
      let type = typeof(response);
      if (type == 'string') {
        this.setState({view:<RegisterForm submitLogIn={this.tryLogIn}/>})
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
        this.setState({view:<LoginForm submitLogIn={this.tryLogIn}/>})
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
        <h2 onClick={() => this.setState({view:<About/>})}>Hiking Habit</h2>
      </div>
      <hr/>
      <div>
        <button onClick={() => this.setState({view:<LoginForm submitLogIn={this.tryLogIn}/>})}>
          Login
        </button>
        <button onClick={() => this.setState({view:<RegisterForm 
                                                    tryRegistration={this.tryRegistration}/>})}>
          Register
        </button>
      </div>
      <div>
        {this.state.view}
      </div>
    </div>
  );
  }
}