'use strict';

class hikeForm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        {this.props.status}
      </div>
    )
  }
}