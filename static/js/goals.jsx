class Goals extends React.Component {
  constructor() {
    super();
    this.state = {view:<allCurrentGoals />}
  }
  
  render() {
    return(
      <div>
        <button onClick={() => this.setState({view:<goalForm/>})}>Add a goal</button>
        <button onClick={() => this.setState({view:<allCurrentGoals/>})}>View Goals</button>
      </div>
    );
  }
}