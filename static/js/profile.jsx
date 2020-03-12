class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div class="row justify-content-center">
        <div class="justify-content-center align-items-center text-center">
          <h4>Welcome {this.props.first} {this.props.last}!</h4><br/>
          <h5>You've been hiking with us since {this.props.createdOn}.</h5><br/>
          <h4>Happy Trails!</h4>
        </div>
      </div>
    )
  }
}