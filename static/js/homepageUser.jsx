"use strict";

class HomepageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:<Trails/>};
    this.tryLogOut = this.tryLogOut.bind(this);
  }
  // has a this.props.userId
  
  tryLogOut() {
    $.get('/api/logout', (response) => {
      this.props.logUserOut();
    });
  };
  
  render() {
    return(
      <div>
        <div>
          <h2 onClick={() => this.setState({view:<Trails/>})}>Hiking Habit</h2>
        </div>
        <div>
          <button onClick={() => this.tryLogOut()}> Logout </button>
          <button onClick={() => this.setState({view:<Profile/>})}> View Profile </button>
        </div>
        <hr/>
        <div>
          {this.props.userId}
        </div>
        <div>
          <button onClick={() => this.setState({view:<Trails/>})}> Trail Search </button>
          <button onClick={() => this.setState({view:<Hikes/>})}> Hike View / Completion </button>
          <button onClick={() => this.setState({view:<Goals/>})}> Goals / Progress </button>
          <button onClick={() => this.setState({view:<About/>})}> About </button>
        </div>
        <hr/>
        <div>
          {this.state.view}
        </div>
      </div>
    )
    
    
  }
}