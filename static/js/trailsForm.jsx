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
    if (zipcode === undefined) {
      alert('Please Enter a zipcode.')
    } else {
      let maxRadius = this.state.maxRadius;
      let length = this.state.length;
      let sort = this.state.sort;
      let maxResults = this.state.maxResults;
      let trailSearchData = {
          zipcode: zipcode,
          maxRadius: maxRadius,
          length: length,
          sort: sort,
          maxResults: maxResults
      };
      this.props.searchTrails(trailSearchData); 
    }
  }
  
  render() {
    return (
      <form>
        <label>
          Zipcode:<input type="text" 
                         name="zipcode" 
                         pattern="\d*" 
                         minlength="5" 
                         maxlength="5" 
                         required 
                         onChange={this.handleInput}/>
          
        </label>
        [at this time U.S. postal only at this time]
        <br/>
        <label>
          Search Distance (Miles):<input type="number" 
                                         name="maxRadius" 
                                         min="30" 
                                         max="200" 
                                         onChange={this.handleInput}/> 
        </label>
        [30-200]
        <br/>
        <label>
          Minimum Trail Length (Miles):<input type="integer" 
                                              name="length" 
                                              min="0" 
                                              max="200" 
                                              onChange={this.handleInput}/>
        </label>
        [0-200]
        <br/>
        <label>
          Sort by:
          &nbsp;
          <input type="radio" 
                 name="sort" 
                 value="length" 
                 onClick={this.handleInput} /> 
          &nbsp;
          Length
          &nbsp;
          <input type="radio" 
                 name="sort" 
                 value="quality" 
                 onClick={this.handleInput} />
          &nbsp;
          Quality
        </label>
        <br/>
        <label>
          Maximum Number Results:<input type="number" 
                                        name="maxResults" 
                                        min="10"
                                        max="500"
                                        onChange={this.handleInput}/>
        </label>
        [10-500]
        <br/>
        <button onClick={this.handleSubmit}> 
          Search
        </button>
      </form>
    );
  }
}