"use strict";

class TrailResults extends React.Component {
  constructor(props) {
    super(props);
    this.state={trails:undefined};
  }
  
  
  render() {
    // if (trails) {
    //   return (
        
    //   )
    // }
    // // let trails = {};
    // // if (trails) {
    // //   return(
    // //     for (trail in Object.values(trails)) {
    // //       <li id=trail.id><a onClick="/hikes/{trail.id}">trail.name</a> (trail.difficulty): trail.summary</li>
    // //     <ul>
    // //       <li>trail.location</li>
    // //       <li>{{trail.length}} miles long</li>
    // //       <li>Ascent: {{trail.ascent}} feet</li>
    // //       <li>Descent: {{trail.descent}} feet</li>
    // //       <li>Status on: {{trail.conditionDate}}: {{trail.conditionStatus}}, {{trail.conditionDetails}} </li>
    // //       <li><a href="/hikes/{{trail.id}}">Let's Hike it!</a></li>
    // //     </ul>
    // //     }
    // //   )
    // //   }
    return (
      <div>
        <p>
          "I took a walk in the woods and came out taller than trees." - Henry David Thoreau
        </p>
      </div>
    );
  }
}