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
    this.props.onCheckHikes(this.state.type);
  }
  
  render() {
    return(
      <form class="form-group row">
        <div class="select-group">
          <label for="hikeFormChoice"> Hike Type:
          </label>
          <select name="type" class="form-control" id="hikeFormChoice" onChange={this.handleChange}>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
            <option value='all'>All</option>
          </select>
          <div class="select-group-btn btn-group">
            <button class="submit btn" onClick={this.handleSubmit}>Search</button>
          </div>
        </div>
      </form>
    );
  };
}