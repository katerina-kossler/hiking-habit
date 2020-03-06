'use strict'

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: undefined,
                  hikeData:undefined,
                  labels:undefined,
                  ratings: undefined,
                  ratingTitle: undefined,
                  goalLine: undefined};
    this.reformatData = this.reformatData.bind(this);
    // rawData, status, dataTitle, goal (value), type
  }

  
  reformatData() {
    const goal = this.props.goal;
    const rawData = this.props.rawData;
    let chartData = [];
    let chartLabels = [];
    let chartRatings = [];
    let goalLine = [];
    chartData.push({
      t: new Date(this.props.createdOn),
      y: 0
    });
    goalLine.push({
      t: new Date(this.props.createdOn),
      y: this.props.goal
    });
    for (const rawInstance of rawData) {
      chartData.push({
        t: new Date(rawInstance.hikedOn),
        y: rawInstance.value
      });
      goalLine.push({
        t: new Date(rawInstance.hikedOn),
        y: goal
      });
      chartLabels.push(new Date(rawInstance.hikedOn));
      chartRatings.push({
        t: new Date(rawInstance.hikedOn),
        y: rawInstance.rating
      });
    }
    console.log(chartData)
    this.setState({loaded: true,
                   hikeData: chartData,
                   labels: chartLabels,
                   ratings: chartRatings,
                   goalLine: goalLine,
                   ratingTitle: 'rating'});
  }
  
  componentDidMount() {
    this.reformatData()
  }
  
  render() {
    let loaded = this.state.loaded;
    let dataLength = this.props.rawData.length;
    if (loaded) {
      if (dataLength >= 1) {
        return(
          <div>
            <HikeChart hikeData={this.state.hikeData}
                       dataTitle={this.props.dataTitle} 
                       labels={this.state.labels} 
                       ratings={this.state.ratings} 
                       ratingTitle={this.state.ratingTitle}
                       status={this.props.status}
                       goalLine={this.state.goalLine}
                       typeTitle={this.props.type}/>
          </div>
        )
      } else {
        return(
          <div>
            You have no hikes completed yet!
          </div>
        )
      }
    } else {
      return(
        <div>
          You have no hikes completed yet!
        </div>
      )
    }
  }
}