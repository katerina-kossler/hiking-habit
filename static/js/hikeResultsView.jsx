'use strict';

class HikeResultsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // want to have a hikeId props
  }
  render() {
    return (
    <div>
      <CurrentResults />
    </div>);
  }
}