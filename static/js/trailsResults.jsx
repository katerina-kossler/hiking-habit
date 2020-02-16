"use strict";

class TrailResults extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const trails = this.props.trails;
    console.log(trails);
    if (trails) {
      if (trails.length == 0) {
        return (
          <div>
            There are no trails that meet those requirements in that zipcode; Please search again.
          </div>
        );
      } else {
        const trailList = [];
        for (const trail of trails) {
          trailList.push(
          <Trail 
            apiId={trail.id}
            name={trail.name}
            sum={trail.summary}
            diff={trail.difficulty}
            loc={trail.location}
            lat={trail.latitude}
            lng={trail.longitude}
            len={trail.length}
            asc={trail.ascent}
            dsc={trail.descent}
            date={trail.conditionDate}
            stat={trail.conditionStatus}
            det={trail.conditionDetails}
          />
          );
        }
        return (
          <div>
            <ul>{trailList}</ul>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>
            "I took a walk in the woods and came out taller than trees." - Henry David Thoreau
          </p>
        </div>
      );
    }

  }
}