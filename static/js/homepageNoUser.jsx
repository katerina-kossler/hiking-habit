// view for no active user - should display options for the loginForm and registerForm

class HomepageNoUser extends React.Component {
  constructor() {
  super();
  this.state = {view:<LoginForm/>}
  }
  
  render() {
  return (
    <div>
      <div>
        <h2 onClick={() => this.setState({view:<LoginForm/>})}>Hiking Habit</h2>
      </div>
      <div>
        <button onClick={() => this.setState({view:<LoginForm/>})}> Login </button>
        <button onClick={() => this.setState({view:<RegisterForm/>})}> Register </button>
      </div>
      <div>
        {this.state.view}
      </div>
    </div>
  );
  }
}