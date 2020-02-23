class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <h3>Welcome {this.props.first} {this.props.last}!!!!</h3>
        <p>You've had an account since {this.props.createdOn} wooooo!</p>
        <p>Thanks for hiking with us!</p>
      </div>
    )
  }
}