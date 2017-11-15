import React, { Component } from "react"
import d3, {geoAzimuthalEqualArea, geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      provinces: [],
      events: [
        { name: "Test", coordinates: [-53.6532, 70.3832], population: 37843000 }
      ],
    }
    console.log(geoMercator);
    this.handleProvinceClick = this.handleProvinceClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  projection() {
    var w = 800; var h = 600;
    return geoAzimuthalEqualArea()
      .rotate([100, -45])
      .center([5, 20])
      .scale(800)
      .translate([w/2, h/2])
  }
  handleProvinceClick(provIndex) {
    console.log("Clicked on country2: ", this.state.provinces[provIndex]);
  }
  handleMarkerClick(i) {
    console.log("Marker: ", this.state.events[i]);
    $('html, body').animate({
      scrollTop: $("#first_nations").offset().top
    }, 1000, "easeInOutExpo");
  }
  componentDidMount() {
    fetch("/public/canada.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(provinces => {
          console.log(provinces);
          this.setState({
            provinces: provinces.features,
          })
        })
      })
  }
  render() {
    return (
      <svg width={ 800 } height={ 600 } viewBox="0 0 800 600">
        <g className="countries">
          {
            this.state.provinces.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${ 1 / this.state.provinces.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                onClick={ () => this.handleProvinceClick(i) }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.events.map((city, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()(city.coordinates)[0] }
                cy={ this.projection()(city.coordinates)[1] }
                r={ city.population / 3000000 }
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default WorldMap
