class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { username: undefined,
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
    let user_data = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
  }
  
  render() {
    return(
      <div>
        <h2>Register as a new user:</h2>
        <form>
          <label>
            Username:<input type="text" name="username" onChange={this.handleInput}/>
          </label>
          <label>
            Email:<input type="text" name="email" onChange={this.handleInput}/>
          </label>
          <label>
            Password:<input type="text" name="password" onChange={this.handleInput}/>
          </label>
          <label>
            First Name:<input type="text" name="first" onChange={this.handleInput}/>
          </label>
          <label>
            Last Name:<input type="text" name="last" onChange={this.handleInput}/>
          </label>
          <br/>
          <button onClick={this.handleSubmit}> Register </button>
        </form>
      </div>
    );
  }
}