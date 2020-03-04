'use strict'

class HikeChart extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <canvas id='progress'></canvas>
      </div>
    )
  }
}