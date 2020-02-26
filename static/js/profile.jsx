class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <h3>Welcome {this.props.first} {this.props.last}!</h3>
        <p>You've been hiking with us since {this.props.createdOn}.</p>
        <p>Happy Trails!</p>
      </div>
    )
  }
}