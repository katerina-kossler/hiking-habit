'use strict';

class CurrentGoals extends React.Component {
  constructor(props) {
    super(props);
    // this.props.viewGoals
    // this.props.goals
  }
  // queries for current goals and passes through to display
  render() {
    const goals = this.props.goals;
    if (goals) {
      if (goals.length == 0) {
        return (
          <div>
            <h4>
              You have no active goals yet. Add one to get started!
            </h4>
          </div>
        );
      } else {
        const goalList = [];
        for (const goal of goals) {
          goalList.push(
          <Goal goalId={goal.goalId}
                title={goal.title}
                type={goal.type}
                numericalValue={goal.numericalValue}
                description={goal.description}
                createdOn={goal.createdOn}
                status={goal.status}
                viewGoals={this.props.viewGoals}
          />
          );
        }
        return (
          <div>
            <ul class="card-columns">{goalList}</ul>
          </div>
        );
      };
    } else {
      return( 
        <div>
          Error - please refresh!
        </div>
      )
    }
  }
}
