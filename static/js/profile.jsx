class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div class="containerWhite">
        <div id="profile">
          <img src="/static/img/tahoe.jpeg" class="w-100 rounded"/>
          <div class="centered">
              <h4>Welcome {this.props.first} {this.props.last}!</h4><br/>
              <h5>You've been hiking with us since {this.props.createdOn}.</h5><br/>
              <h4>Happy Trails!</h4>
          </div>
        </div>
      </div>
    )
  }
}