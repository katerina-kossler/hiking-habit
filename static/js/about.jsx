
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <div class="row justify-content-center align-items-center">
          <h3 class="text-center">A habit app</h3>
        </div>
        <div class="row justify-content-center align-items-center">
        <h4 class="text-center">for the  thru-hiker, weekend walker, and everyone in between</h4>
        </div>
        <hr/>
        <div class="row justify-content-center align-items-center">
          <h5>
          <a href="https://www.hikingproject.com/">The Hiking Project</a>
              : REI's Hiking Project was used to supply trail data.
          </h5>
        </div>
      </div>
    );
  }
}
