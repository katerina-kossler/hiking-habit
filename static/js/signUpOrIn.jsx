// parent for logic of login and register

class signUpOrIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }
  
  // any functions needed to deal with logic and work with back end=
  // post to /login or /register
  // get responses and deal with appropriately
  // 
  
    // onLoginSuccess(response) {
  //     if (response !== this.state.currentUser) {
  //       this.setState({currentUser: response,
  //                      currentPage: 2});
  //       console.log(this.state.currentUser);
  //     }
  // }

  
  componentDidMount() {
  // $.get('/check_current_user', this.onLoginSuccess);
  }
  
  render() {
    return(
      <div>
        {/* do I even need a return here? Maybe to flash or alert a success or error messages? 
            - maybe to then render another logic function for the homepageUser */}
      </div>
    )
  }
  
}