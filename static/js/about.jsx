
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <h2> Info on How Hiking Habit was built and what it uses </h2>
        <p>
          <a href="https://www.hikingproject.com/data">The Hiking Project</a>: 
          REI's Hiking Porject was used to supply trail data and status.
        </p>
      </div>
    );
  }
}
