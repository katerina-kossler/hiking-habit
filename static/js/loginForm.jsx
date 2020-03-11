"use strict";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined,
                   password: undefined};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();  
    let user = this.state.user;
    let password = this.state.password;
    let user_data = {user: user,
                     password: password};
    this.props.submitLogIn(user_data);
  }
  
  render() {
  return (
    <div class="container mx-auto">
      <div class="row justify-content-center align-items-center">
        <h3>You're signed out</h3>
      </div>
      <div class="row justify-content-center align-items-center">
        <h4>Log in to plan new adventures!</h4>   
      </div>
      <div class="row mw-50">
        <form>
          <div class="form-group">
            <label for="loginFormUserOrEmail">Username or email:</label>
            <input type="text" class="form-control" 
                  id="loginFormUserOrEmail"
                  placeholder="name@example.com" 
                  name="user" onChange={this.handleInput}/>
          </div>
          <div class="form-group">
            <label for="loginFormPassword">Password:</label>
            <input type="password" class="form-control" 
                  id="loginFormPassword"
                  placeholder="password"
                  name="password" onChange={this.handleInput}/>
          </div>
          <button class='submit btn' onClick={this.handleSubmit}> Login </button>
        </form>
      </div>
    </div>
  );
  }
}
