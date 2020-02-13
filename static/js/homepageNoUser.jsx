"use strict";

class HomepageNoUser extends React.Component {
  constructor() {
    super();
    this.state = {view:<LoginForm/>};
    this.tryLogIn=this.tryLogIn.bind(this);
    this.tryRegistration=this.tryRegistration.bind(this);
    
  }
  
  tryRegistration = (data) => {
    console.log(data);
    $.post('/api/register', (response) => {
      console.log(response);
    });
  };
  
  tryLogIn = (data) => {
    console.log(data);
    $.post('/api/login', (response) => {
      console.log(response);
      let type = typeof(response);
      if (type == 'number') {
        this.props.logUserIn(response);
      } else if (type == 'string') {
        this.setState({view:<LoginForm submitLogIn={this.tryLogIn}/>})
        alert(response);
      }
    });
  };
  
  render() {
  return (
    <div>
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