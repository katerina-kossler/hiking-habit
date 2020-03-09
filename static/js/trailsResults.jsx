"use strict";

class TrailsResults extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const trails = this.props.trails;
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
          <div class="row">
            <ul class>{trailList}</ul>
          </div>
        );
      }
    } else {
      return (
        <div class="spotLight">
          {this.props.quote}
        </div>
      );
    }

  }
}