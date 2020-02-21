'use strict';

class HikeResultForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {assessment: undefined,
                    distance: undefined,
                    hikedOn: undefined,
                    ascentRating: "VERY_EASY",
                    distanceRating: "VERY_EASY",
                    challengeRating: "VERY_EASY",
                    hikeTime: undefined};
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.props.onUpdate
    }
    
    handleInput(event) {
      this.setState({[event.target.name]: event.target.value});
      console.log(event.target.name) 
      console.log(event.target.value)
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const hikeId = this.props.hikeId;
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
          hikeTime: hikeTime
          };
      console.log(result_data);
      // $.post('/api/hike_result', result_data, (response) => {
      //   alert(response);
      // });
      // this.props.onUpdate();
    }
    
    render() {
      return(
        <div>
          <h2>Trail Details: </h2>
          <h2>Hike Results:</h2>
          <form>
            <label>
              Assessment:<input type="text" 
                                name="assessment" 
                                size='70'
                                onChange={this.handleInput}/>
            </label>
            <label>
              Distance Hiked (mi):<input type="text" // change to number after prop passes 
                                    name="distance" 
                                    placeholder={'hi i will soon be a prop'} // working here!!! want the trail distance here
                                    onChange={this.handleInput}/>
            </label>
            <label>
              Date Hiked:<input type="date" 
                                name="hikedOn" 
                                onChange={this.handleInput}/>
            </label>
            <label>
              Time Hiked (h):<input type="number" 
                                    minlength="1" 
                                    name="hikedTime" 
                                    onChange={this.handleInput}/>
            </label>
            <br/>
            <label>
              How were the following:
            </label>
            <label>
              The climb / ascent:
              <select name="ascentRating" onChange={this.handleInput}>
                <option value="VERY_EASY">Very Easy</option>
                <option value="EASY">Easy</option>
                <option value="AVERAGE">Average</option>
                <option value="DIFFICULT">Difficult</option>
                <option value="VERY_DIFFICULT">Very Difficult</option>
              </select>
            </label> 
            <label>
              Distance:
              <select name="distanceRating" onChange={this.handleInput}>
                <option value="VERY_EASY">Very Easy</option>
                <option value="EASY">Easy</option>
                <option value="AVERAGE">Average</option>
                <option value="DIFFICULT">Difficult</option>
                <option value="VERY_DIFFICULT">Very Difficult</option>
              </select>
            </label>
            <label>
              The rigor / challenge of the trail:
              <select name="challengeRating" onChange={this.handleInput}>
                <option value="VERY_EASY">Very Easy</option>
                <option value="EASY">Easy</option>
                <option value="AVERAGE">Average</option>
                <option value="DIFFICULT">Difficult</option>
                <option value="VERY_DIFFICULT">Very Difficult</option>
              </select>
            </label>

            <br/>
            <button onClick={this.handleSubmit}> Register </button>
          </form>
        </div>
      );
    }
  }