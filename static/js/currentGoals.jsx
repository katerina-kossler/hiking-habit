'use strict';

class CurrentGoals extends React.Component {
  constructor(props) {
    super(props);
  }
  // queries for current goals and passes through to display
  render() {
    const goals = this.props.goals;
    if (goals) {
      if (goals.length == 0) {
        return (
          <div>
            You have no active goals yet, please add one.
          </div>
        );
      } else {
        const goalList = [];
        for (const goal of goals) {
          goalList.push(
          <Goal 
            goalId= {goal.goalId}
            title= {goal.title}
            type= {goal.type}
            numericalValue= {goal.numericalValue}
            description= {goal.description}
            createdOn= {goal.created_on}
            status= {goal.status}
          />
          );
        }
        return (
          <div>
            hi
            <ul>{goalList}</ul>
          </div>
        );
      };
    };
  }
}
