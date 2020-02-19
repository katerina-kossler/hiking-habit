'use strict';

class HikeResultForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {hikeId: this.props.hikeId,
                    assessment: undefined,
                    distance: undefined,
                    hikedOn: undefined,
                    ascentRating: undefined,
                    distanceRating: undefined,
                    challengeRating: undefined,
                    hikeTime: undefined};
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInput(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const hikeId = this.state.hikeId;
      const assessment = this.state.assessment;
      const distance = this.state.distance;
      const hikedOn = this.state.hikedOn;
      const ascentRating = this.state.ascentRating;
      const distanceRating = this.state.distanceRating;
      const challengeRating = this.state.challengeRating;
      const hikeTime = this.state.hikeTime; 
      let result_data = {
          hikeId: hikeId,
          assessment: assessment,
          distance: distance,
          hikedOn: hikedOn,
          ascentRating: ascentRating,
          distanceRating: distanceRating,
          challengeRating: challengeRating,
          hikeTime: hikedTime
          };
      this.props.submitResult(result_data);
    }
    
    render() {
      return(
        <div>
          <h2>Register as a new user:</h2>
          <form>
            <label>
              Username:<input type="text" name="username" onChange={this.handleInput}/>
            </label>
            <label>
              Email:<input type="text" name="email" onChange={this.handleInput}/>
            </label>
            <label>
              Password:<input type="password" name="password" onChange={this.handleInput}/>
            </label>
            <label>
              First Name:<input type="text" name="first" onChange={this.handleInput}/>
            </label>
            <label>
              Last Name:<input type="text" name="last" onChange={this.handleInput}/>
            </label>
            <br/>
            <button onClick={this.handleSubmit}> Register </button>
          </form>
        </div>
      );
    }
  }