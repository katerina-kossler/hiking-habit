'use strict'

class Progress extends React.Component {
  constructor(props) {
    super(props);
  }
  
  // takes in hikes for a given goal, reformats the data into chart.js friendly format
  // and send the data and details to the chart
  
  componentDidMount() {
    const myReference = this.chartRef.current.getContext("2d");
  }
  
  render() {

    results = this.props.results;
    
    if (results) {
      return(
        <div>
          < HikeChart />
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