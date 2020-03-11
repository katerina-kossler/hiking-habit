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
    this.props.onCheckHikes(this.state.type);
  }
  
  componentWillUpdate() {
    this.handleSubmit();
  }
  
  render() {
    return(
      <div class="input-group col-sm-2 col-md-3">
        <select name="type" class="form-control" id="hikeFormChoice" onChange={this.handleChange}>
          <option value='all'>All</option>
          <option value='complete'>Complete</option>
          <option value='incomplete'>Incomplete</option>
        </select>
      </div>
    );
  };
}