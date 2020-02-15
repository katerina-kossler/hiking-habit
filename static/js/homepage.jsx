"use strict";
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const Redirect = ReactRouterDOM.Redirect;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                  user: undefined};
  }
  
  onLogIn = (userId) => {
    this.setState({view: <HomepageUser logUserOut={this.onLogOut} userId={userId}/>,
                   user: userId});
  };
  
  onLogOut = () => {
    this.setState({view: <HomepageNoUser logUserIn={this.onLogIn}/>,
                   user: undefined});
  };  
  
  render() {
    return (
    <Router>
      {this.state.view}
    </Router>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));