'use strict';

class HikeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onCheckHikes(event.target.value);
  }
  
  render() {
    return(
      <div class="col-4 col-sm-3 col-md-2 col-lg-1 justify-content-center align-items-center">
        <div class="input-group">
          <select name="type" class="form-control text-center" id="hikeFormChoice" onChange={this.handleChange}>
            <option value='all'>All</option>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
          </select>
        </div>
      </div>
    );
  };
}