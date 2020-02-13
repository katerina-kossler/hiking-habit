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
    let user_data = {
        user: user,
        password: password
    };
    this.props.submitLogIn(user_data);
  }
  
  render() {
  return (
    <div>
      <h2>Login:</h2>
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
    </div>
  );
  }
}