"use strict";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                  user: undefined};
  }
  
  onLogIn = (userId) => {
    this.setState({view: <HomepageUser logUserOut={this.onLogOut}/>,
                   user: userId});
  };
  
  onLogOut = () => {
    this.setState({view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                   user: undefined});
  };  
  
  render() {
    return (
      <div>
        <div >
          {this.state.view}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));