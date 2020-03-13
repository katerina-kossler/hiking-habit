'use strict'

class HikeChart extends React.Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    // hikeData={this.state.hikeData}
    // dataTitle={this.props.dataTitle} 
    // labels={this.state.labels} 
    // ratings={this.state.ratings} 
    // ratingTitle={this.state.ratingTitle}
    // status={this.props.status}
    // goalLine={this.state.goalLine}
    // typeTitle={this.props.type}
  }

  makeChart() {
    let ctx = document.getElementById("progress").getContext('2d');
    let type = this.props.typeTitle;
    let myChart= new Chart(ctx, {
      data: {
        labels: this.props.labels,
        datasets: [{
          type: 'line',
          label: 'Progress',
          data: this.props.hikeData,
          fill: true,
          borderColor: '#2196f3', 
          backgroundColor: '#2196f3',
          yAxisID: 'progress',
          },
          {label: 'Goal',
          type: 'line',
          data: this.props.goalLine,
          fill: false,
          borderColor: '#228B22',
          backgroundColor: '#228B22'
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.props.status
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5
            }
          }],
          yAxes: 
          [{
            id: 'progress',
            type: 'linear',
            ticks: {
              precision: 0,
              autoSkip: true,
              maxTicksLimit: 5
            },
            scaleLabel: {display:true,labelString:this.props.typeTitle},
          }
        ]
        },
        elements: {
          line: {
              tension: 0
          }
        },
        responsive: true,
        maintainAspectRatio: true,
      }
  });
  }
  
  componentDidMount() {
    this.makeChart()
  }

  render() {
    return(
      <div>
        <canvas id='progress'></canvas>
      </div>
    )
  }
}