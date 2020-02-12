
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: <HomepageUser/>}
  }
  

  componentDidMount() {
  }
  
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