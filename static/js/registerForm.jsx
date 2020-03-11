"use strict";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: undefined,
                   email: undefined,
                   password: undefined,
                   first: undefined,
                   last: undefined};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let firstName = this.state.first;
    let lastName = this.state.last;
    let user_data = {username: username,
                      email: email,
                      password: password,
                      first: firstName,
                      last: lastName};
    this.props.tryRegistration(user_data);
  }
  
  render() {
    return(
    <div class="container mx-auto">
      <div class="row justify-content-center align-items-center">
        <h3>Welcome</h3>
      </div>
      <div class="row justify-content-center align-items-center">
        <h4>Sign up to start your hiking journey!</h4>   
      </div>
      <div class="row  justify-content-center align-items-center mw-50">
        <form>
          <div class="form-group">
            <label for="registerFormUser col-sm-4 col-form-label" clas>
              Username:
            </label>
            <input type="text" class="form-control" 
                  id="registerFormUser"
                  placeholder="JohnMuir" 
                  name="username" onChange={this.handleInput}/>
          </div>
          <div class="form-group">
            <label for="registerFormEmail">Email:</label>
            <input type="email" class="form-control" 
                  id="registerFormEmail" 
                  placeholder="name@example.com"
                  name="email" onChange={this.handleInput}/>
          </div>
          <div class="form-group">
            <label for="registerFormFirst">First Name:</label>
            <input type="text" class="form-control" 
                  id="registerFormFirst"
                  placeholder="John" 
                  name="first" onChange={this.handleInput}/>
          </div>
          <div class="form-group">
            <label for="registerFormLast">Last Name:</label>
            <input type="text" class="form-control" 
                  id="registerFormLast" 
                  placeholder="Muir"
                  name="last" onChange={this.handleInput}/>
          </div>
          <div class="form-group">
            <label for="loginFormPassword">Password:</label>
            <input type="password" class="form-control" 
                  id="loginFormPassword"
                  placeholder="password"
                  name="password" onChange={this.handleInput}/>
          </div>
          <button class='submit btn' onClick={this.handleSubmit}> Register </button>
        </form>
      </div>
    </div>
    );
  }
}