"use strict";

class TrailsForm extends React.Component {
  constructor() {
    super();
    this.state={zipcode: undefined,
                maxRadius: 30,
                length: 0,
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
    <div class="container">
      <form>
        <div class="form-group row">
          <label for="trailsFormZipcode" class="col-sm-4 col-form-label">
            Zipcode
          </label>
          <div class="input-group col-sm-8">
            <input type="text" class="form-control"
                    id="trailsFormZipcode"
                    placeholder="Enter a U.S. postal zipcode" name="zipcode" 
                    pattern="\d*" minlength="5" maxlength="5" 
                    required onChange={this.handleInput}/>
            <div class="input-group-btn btn-group">
              <button class="btn btn-light dropdown-toggle" type="button" 
                      data-toggle="collapse" data-target="#moreSearchCriteria" 
                      aria-expanded="false" aria-controls="moreSearchCriteria">
                <span class="caret"></span>
              </button>
              <button class="btn submit" type="button" onClick={this.handleSubmit}> 
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
        <div class="collapse" id="moreSearchCriteria">
          <div class="form-group row"> 
            <label for="trailsFormMaxRadius" class="col-sm-4 col-form-label">
              Search Radius (Miles)
            </label>
            <div class="col-sm-8">
              <input type="number" class="form-control"
                    id="trailsFormMaxRadius"
                    placeholder="30-200" name="maxRadius" 
                    min="30" max="200" onChange={this.handleInput}/> 
            </div>
          </div>
          <div class="form-group row">
            <label for="trailsFormMinLength" class="col-sm-4 col-form-label">
              Minimum Length (Miles)
            </label>
            <div class="col-sm-8">
              <input type="number" class="form-control"
                    id="trailsFormMinLength"
                    name="length" placeholder="0-200" 
                    min="0" max="200" onChange={this.handleInput}/>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-4 pt-0">Sort By</legend>
            <div class="col-sm-8">
              <div class="form-check-inline">
                <label class="form-check-label" for="sortLength">
                  <input type="radio" class="form-check-input"
                        id="sortLength" 
                        name="sort" value="length" defaultChecked/>
                  Length
                </label>
              </div>
              <div class="form-check-inline">
                <label class="form-check-label" for="sortQuality">
                  <input type="radio" class="form-check-input" 
                        id="sortQuality"
                        name="sort" value="quality"/>
                  Quality
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="trailsFormMaxResults"class="col-sm-4">
              Maximum Result Number
            </label>
            <div class="col-sm-8">
              <input type="number" class="form-control"
                      id="trailsformMaxResults"
                      name="maxResults" 
                      min="10" max="500"
                      placeholder="10-500"
                      onChange={this.handleInput}/>
            </div>
          </div>
        </div>
      </form>
    </div>
    );
  }
}