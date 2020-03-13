'use strict';

class CurrentHikes extends React.Component {
  constructor(props) {
    super(props);
 // this.props.hikes
 // this.props.onUpdate
 // this.props.renderForm
  }

  render() {
    const hikes = this.props.hikes;
    if (hikes) {
      if (hikes.length == 0) {
        return (
          <div class="row justify-content-center align-items-center text-center">
            <h4>
              You don't have hikes matching that filter, go to Trail Search to make a new hike!
            </h4>
          </div>
        );
      } else {
        const hikeList = [];
        for (const hike of hikes) {
          hikeList.push(
            <Hike 
              hikeId={hike.hikeId}
              trailName={hike.trailName}
              trailDescription={hike.trailDescription}
              isComplete={hike.isComplete}
              onUpdate={this.props.onUpdate}
              renderForm={this.props.renderForm}
            />
          );
        };
        return(
            <ul class="form-inline card-deck">
              {hikeList}          
            </ul>
        );
      };
    } else {
      return (
        <div>
          Choose a (hike) view to get started!
        </div>
      )
    };
  };
}