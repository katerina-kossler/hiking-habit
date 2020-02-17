'use strict';

class HikeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={type: 'all'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({type: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let criteria = this.state.type;
    this.props.checkHikes(criteria);
  }
 
  render() {
    return(
      <form>
        <label> Hike Type:
          <select value={this.state.type} name="type" onChange={this.handleChange}>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
            <option value='all'>All</option>
          </select>
          <button onClick={this.handleSubmit}> 
            Search
          </button>
        </label>
      </form>
    );
  };
}