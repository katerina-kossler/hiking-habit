class Trails extends React.Component {
  constructor() {
    super();
    
    this.state={ view:undefined }
  }
  
  render() {
  
    return(
      <div>
        <h3> Trail Search:</h3>
        <div>
          <TrailsForm/>
        </div>
        <hr/>
        <div>
          {this.state.view}
        </div>
      </div>
    );
  }
}