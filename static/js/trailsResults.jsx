class TrailResults extends React.Component {
  constructor() {
    super();
    this.state={}
  }
  
  render() {
    return(
      <div>
        {/* jinja solution that worked for showing trail results */}
          {/* {% if trails %}
  <ul>
    {% for trail in trails %}
      <li id={{trail.id}}><a href="/hikes/{trail.id}">{{trail.name}}</a> ({{trail.difficulty}}): {{trail.summary}}</li>
      <ul>
        <li>{{trail.location}}</li>
        <li>{{trail.length}} miles long</li>
        <li>Ascent: {{trail.ascent}} feet</li>
        <li>Descent: {{trail.descent}} feet</li>
        <li>Status on: {{trail.conditionDate}}: {{trail.conditionStatus}}, {{trail.conditionDetails}} </li>
        <li><a href="/hikes/{{trail.id}}">Let's Hike it!</a></li>
      </ul>
    {% endfor %}
  </ul>
  {% else %}
    "I took a walk in the woods and came out taller than trees." - Henry David Thoreau
  {% endif %} */}
      </div>
    )
  }
}