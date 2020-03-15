
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <div class="justify-content-center align-items-center">
          <div class="row justify-content-center align-items-center">
            <h3 class="text-center">A habit app</h3>
          </div>
          <div class="row justify-content-center align-items-center">
            <h4 class="text-center">for the  thru-hiker, weekend walker, and everyone in between</h4>
          </div>
        </div>
        <hr/>
        <div class="justify-content-center align-items-center">
          <div class="row justify-content-center align-items-center">
            <h5 class="text-center">
              <a href="https://www.hikingproject.com/">The Hiking Project</a>
                  : REI's The Hiking Project was used to supply trail data.
            </h5>
          </div>
          <div class="row justify-content-center align-items-center">
            <h5 class="text-center">
              This project was inspired by my love of hiking and is my first full-stack project.
            </h5>
          </div>
          <div class="row justify-content-center align-items-center">
            <h5 class="text-center">
              Check out the project's <a href="https://github.com/katerina-kossler/hiking-habit">GitHub</a> for more information
            </h5>
          </div>
        </div>
        <div class="row justify-content-center align-items-center p-3">
          <div>  
            <img src='/static/img/butterfree.jpeg' class="row w-50 rounded"></img>
          </div>
          <div> 
            <h5 class="text-center">Here's a view from atop Mt. Rose!</h5>
          </div>
        </div>
      </div>
    );
  }
}
