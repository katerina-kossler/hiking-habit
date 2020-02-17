'use strict';

class CurrentHikes extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const hikes = this.props.hikes;
    console.log('hikes:');
    console.log(hikes);
    if (hikes) {
      if (hikes.length == 0) {
        return (
          <div>
            You don't have any hikes yet, go to Trail Search to find a trail to hike on!
          </div>
        );
      } else {
        const hikeList = [];
        for (const hike of hikes) {
          console.log('hike:');
          console.log(hike);
          hikeList.push(
            <Hike 
              hikeId={hike.hikeId}
              trailName={hike.trailName}
              trailDescription={hike.trailDescription}
              isComplete={hike.isComplete}
            />
          );
        };
        return(
          <div>
            <ul>
              {hikeList}          
            </ul>
          </div>
        );
      };
    } else {
      return (
        <div>
          Choose a view.
        </div>
      )
    };
  };
}