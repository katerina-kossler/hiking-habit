"use strict";

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                  user: undefined};
  }
  
  onLogIn = (userInfo) => {
    this.setState({view: <HomepageUser logUserOut={this.onLogOut}/>,
                    user: userInfo});
  };
  
  onLogOut = () => {
    this.setState({view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                   user: undefined});
  };  
  
  render() {
    return (
      <div>
        <div>
          <h2 onClick={() => this.setState({view:<About/>})}>
            Hiking Habit
          </h2>
        </div>
        <div >
          {this.state.view}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));