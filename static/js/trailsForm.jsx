"use strict";

class TrailsForm extends React.Component {
  constructor() {
    super();
    this.state={zipcode: undefined,
                maxRadius: 30,
                length: 10,
                sort: "length",
                maxResults: 10};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }
  
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    let zipcode = this.state.zipcode;
    let maxResults = this.state.maxResults;
    let maxRadius = this.state.maxRadius;
    let length = this.state.length;
    if (zipcode === undefined) {
      alert('Please Enter a zipcode.');
    } else if (maxResults > 500) {
      alert('Maximum number of results is 500, please reduce.');
    } else if (maxResults < 10) {
      alert('Minimum number of max results is 10, please increase.') 
    } else if (maxRadius > 200) {
      alert('Maximum radius is 200 miles, please reduce.')
    } else if (maxRadius < 30) {
      alert('Minimum radius is 30 miles, please increase.')
    } else if (length < 0) {
      alert('Minimum minimum trail length is 0 miles, please increase') 
    } else if (length > 200) {
      alert('Maximum minimum trail length is 200 miles, please reduce.')
    } else {
      let sort = this.state.sort;
      let trailSearchData = {zipcode: zipcode,
                              maxRadius: maxRadius,
                              length: length,
                              sort: sort,
                              maxResults: maxResults};
      this.props.searchTrails(trailSearchData); 
    }
  }
  
  render() {
    return (
      <form>
        <label for='zipcode'>Zipcode:</label>
        <input  type="text" 
                name="zipcode" 
                pattern="\d*" 
                minlength="5" 
                maxlength="5" 
                required 
                onChange={this.handleInput}/>
        [at this time U.S. postal only]
        <br/>
        <label for='maxRadius'>Search Distance (Miles):</label>
        <input type="number" 
               name="maxRadius" 
               min="30" 
               max="200"
               placeholder="30" 
               onChange={this.handleInput}/> 
        [30-200]
        <br/>
        <label for='length'>Minimum Trail Length (Miles):</label>
        <input type="number" 
               name="length" 
               min="0" 
               max="200"
               placeholder="10" 
               onChange={this.handleInput}/>
        [0-200]
        <br/>
        <label for='sort'>Sort by:&nbsp;</label>
        <input type="radio" 
                name="sort" 
                value="length" 
                onClick={this.handleInput} defaultChecked/> 
        &nbsp;
        Length
        &nbsp;
        <input type="radio" 
                name="sort" 
                value="quality" 
                onClick={this.handleInput} />
        &nbsp;
        Quality
        <br/>
        <label for='maxResults'>Maximum Number Results:</label>
        <input type="number" 
               name="maxResults" 
               min="10"
               max="500"
               placeholder="10"
               onChange={this.handleInput}/>
        [10-500]
        <br/>
        <button onClick={this.handleSubmit}> 
          Search
        </button>
      </form>
    );
  }
}