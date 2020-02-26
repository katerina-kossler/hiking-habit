'use strict';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    //this.props
  }
  // shows details of a goal,
  //       hikes that contribute to a goal
  //       and a button to cancel a goal
  //       (if time give option to edit a goal)
  // need some way to check when goals are loaded if it is completed
  // if complete change is_complete?
  render() {
    return (
      <div>
        each instance of a goal
        {this.props.goalId}
      </div>
    );
  }
}