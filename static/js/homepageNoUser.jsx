// view for no active user - should display options for the loginForm and registerForm

class HomePageNoUser extends React.Component {
  constructor() {
  this.state = { view: <About/> }
  }
  
  render() {
  return (
    <div>
      <div>
        <text onClick={() => this.setState({view: <About/>})}>Hiking Habit</text>
      </div>
      <div>
        <button onClick={() => this.setState({view: <LoginForm/>})}> Login </button>
        <button onClick={() => this.setState({view: <RegisterForm/>})}> Register </button>
      </div>
      <div>
        {this.state.view}
      </div>
    </div>
  );
  }
}