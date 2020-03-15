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
    <div  class="headerImg" id="login">
      <div class="row justify-content-center align-items-center">
        <h3>Welcome!</h3>
      </div>
      <div class="row justify-content-center align-items-center">
        <h4>Log in to plan new adventures!</h4>   
      </div>
      <div class="row mw-50">
        <form>
          <div class="form-group row justify-content-center align-items-center">
            <label for="loginFormUserOrEmail" class="text-center col-lg-4 col-6">Username or email:</label>
            <div class="col-lg-4 col-6">
              <input type="text" class="form-control" 
                id="loginFormUserOrEmail"
                placeholder="name@example.com" 
                name="user" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <label for="loginFormPassword" class="text-center col-lg-4 col-6">Password:</label>
            <div class="col-lg-4 col-6">
              <input type="password" class="form-control" 
                id="loginFormPassword"
                placeholder="password"
                name="password" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <button class='submit btn' onClick={this.handleSubmit}> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
  }
}
