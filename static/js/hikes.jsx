class Hikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hikes: []};
  }
  
  viewHikes() {
    console.log(searchParams);
    $.get('/hikes', (response) => {
      this.setState({hikes: response})
    });
  }
  
  render() {
    return(
      <div>
        {this.hikes}
      </div>
    );
  }
}