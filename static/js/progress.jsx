'use strict'

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:undefined,
                  labels:undefined};
    this.reformatData = this.reformatData.bind(this);
  }
  
  // takes in hikes for a given goal, reformats the data into chart.js friendly format
  // and send the data and details to the chart
  
  reformatData() {
    const rawData = this.props.rawData;
    let chartDatasets = [];
    let chartLabels = [];
    for (const rawInstance of rawData) {
      chartDatasets.push(rawInstance.value)
      console.log(rawInstance)
      console.log(rawInstance.hikedOn)
      chartLabels.push(rawInstance.hikedOn)
      
                // const goalType = response.goal_type,
                          // 'hikeId': result.hike_id,
                          // 'value': result.distance_in_miles,
                          // 'rating': rating_from_enum,
                          // 'ratingType': 'Distance Rating'
                          // 'hikedOn': result.hiked_on.isoformat()}
      
    }
    this.setState({data: chartDatasets,
                   labels: chartLabels});
  }
  
  componentDidMount() {
    this.reformatData()
  }
  
  render() {
    let data = this.props.rawData;
    
    if (data.length >= 1) {
      return(
        <div>
          <HikeChart data={this.state.data} labels={this.state.labels}/>
        </div>
      )
    }
    else {
      return(
        <div>
          You have no hikes completed yet!
        </div>
      )
    }
  }
}