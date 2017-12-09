import React, { Component } from "react"
import d3, {geoAzimuthalEqualArea, geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import ReactTooltip from 'react-tooltip'

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      provinces: [],
      events: [
        { name: "Test", coordinates: [-75.6972, 45.4215], anchor:"#first_nations", tooltip:"This dot refers to the Indian act as discussed above." },
        { name: "Test", coordinates: [-123.120, 49.2827], tooltip:"EXTERNAL LINK: Racism that occured in Vancouver British Columbia."}
      ],
    }
    this.handleProvinceClick = this.handleProvinceClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  projection() {
    var w = 800; var h = 600;
    return geoMercator()
      .rotate([100, -45])
      .center([5, 20])
      .scale(800)
      .translate([w/2, h/2])
  }
  handleProvinceClick(provIndex) {
    console.log("Clicked on country: ", this.state.provinces[provIndex]);
  }

  goToAnchor(anchor) {
    $('html, body').animate({
      scrollTop: $(anchor).offset().top
    }, 1000, "easeInOutExpo");
  }

  handleMarkerClick(i) {
    console.log("Marker: ", this.state.events[i]);
    if (this.state.events[i].anchor) {
        this.goToAnchor(this.state.events[i].anchor);
    } else {
      var win = window.open('http://stackoverflow.com/', '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    }
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
      <div id="parent">
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
                data-tip={city.tooltip}
                key={ `marker-${i}` }
                cx={ this.projection()(city.coordinates)[0] }
                cy={ this.projection()(city.coordinates)[1] }
                r={ 5 }
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
      </svg>
      <ReactTooltip />
      </div>
    )
  }
}

export default WorldMap
