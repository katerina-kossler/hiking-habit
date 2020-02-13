"use strict";

class HomepageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:<Trails/>}
  }
  
  onLogOut = () => {
    this.setState({})
  }
    
  
  render() {
    return(
      <div>
        <div>
          <h2 onClick={() => this.setState({view:<Trails/>})}>Hiking Habit</h2>
        </div>
        <div>
          <button onClick={() => this.setState({view:<LogOut/>})}> Logout </button>
          <button onClick={() => this.setState({view:<Profile/>})}> View Profile </button>
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