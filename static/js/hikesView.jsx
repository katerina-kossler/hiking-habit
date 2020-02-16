'use strict';

class HikesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hikes:undefined};
    this.checkHikes=this.checkHikes.bind(this);
  }
  
  checkHikes() {
    $.get('/api/hikes', (response) => {
      console.log(response);
      
    });
  }
  
  render() {
      return(
        <div>
          <button onClick={this.checkHikes}>Get Hikes</button>
        </div>
        // <Switch>
        //   <Route exact path='/hikes/to-do'>
        //     <HikesView complete='False'/>
        //   </Route>
        //   <Route path='/hikes/complete'>
        //     <HikesView complete='True'/>
        //   </Route>
        // </Switch>
      )
  }
}