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
    <div class="headerImg whiteText" id="register">
      <div class="row justify-content-center align-items-center">
        <h3>Welcome</h3>
      </div>
      <div class="row justify-content-center align-items-center">
        <h4>Sign up to start your hiking journey!</h4>   
      </div>
      <div class="row mw-50">
        <form>
          <div class="form-group row justify-content-center align-items-center">
            <label for="registerFormUser" class="text-center col-lg-4 col-6">
              Username:
            </label>
            <div class="col-lg-4 col-6">
              <input type="text" class="form-control" 
                    id="registerFormUser"
                    placeholder="JohnMuir" 
                    name="username" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <label for="registerFormEmail" class="text-center col-lg-4 col-6">
              Email:
            </label>
            <div class="col-lg-4 col-6">
              <input type="email" class="form-control" 
                  id="registerFormEmail" 
                  placeholder="name@example.com"
                  name="email" onChange={this.handleInput}/>
            </div>

          </div>
          <div class="form-group row justify-content-center align-items-center">
            <label for="registerFormFirst" class="text-center col-lg-4 col-6">
              First Name:
            </label>
            <div class="col-lg-4 col-6">
              <input type="text" class="form-control" 
                      id="registerFormFirst"
                      placeholder="John" 
                      name="first" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <label for="registerFormLast" class="text-center col-lg-4 col-6">
              Last Name:
            </label>
            <div class="col-lg-4 col-6">
              <input type="text" class="form-control" 
                  id="registerFormLast" 
                  placeholder="Muir"
                  name="last" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <label for="loginFormPassword" class="text-center col-lg-4 col-6">
              Password:
            </label>
            <div class="col-lg-4 col-6">
              <input type="password" class="form-control" 
                    id="loginFormPassword"
                    placeholder="password"
                    name="password" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row justify-content-center align-items-center">
            <button class='submit btn' onClick={this.handleSubmit}> Register </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}