class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div class="row">
        <div class="justify-content-center align-items-center">
          <h3>Welcome {this.props.first} {this.props.last}!</h3><br/>
          <h4>You've been hiking with us since {this.props.createdOn}.</h4><br/>
          <h3>Happy Trails!</h3>
        </div>
      </div>
    )
  }
}