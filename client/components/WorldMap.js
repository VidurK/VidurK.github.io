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
        { name: "Nova Scotia", coordinates: [-63.7443, 44.6820], anchor:"#black", tooltip:"Racism within the provincial school system"},
        { name: "Winnipeg, Manitoba", coordinates: [-97.131067, 49.890646], link:"https://humanrights.ca/explore", tooltip:"Canadian Museum for Human Rights"},
        { name: "Quebec City, Quebec", coordinates: [-71.286072, 46.782997], link:"https://en.wikipedia.org/wiki/Quebec_City_mosque_shooting", tooltip:"Quebec City Mosque Shooting resulting in 6 deaths"},
        { name: "Vancouver, British Columbia", coordinates: [-123.1207, 49.2827], link:"https://en.wikipedia.org/wiki/Komagata_Maru_incident", tooltip:"The Komagata Maru incident involved a group of citizens of the British Raj who attempted to emigrate to Canada in 1914 but were denied entry"},
        { name: "Nanaimo, British Columbia", coordinates: [-123.9401, 49.1659], anchor:"#japanese", tooltip:"One of the many Japanese Internment camps was located here"},
        { name: "Markham, Ontario", coordinates: [-79.3370, 44.0561], link:"https://globalnews.ca/news/3530643/dash-cam-racist-verbal-attack/", tooltip:"Dash cam video captures racist verbal attack on Asian senior"},
        { name: "Thunder Bay, Ontario", coordinates: [-89.2477, 48.3809], link:"http://www.cbc.ca/news/indigenous/police-racial-bias-aboriginal-canada-1.3761884", tooltip:"Racial bias in Canadian Policing against Indigenous people"},
        { name: "Toronto, Ontario", coordinates: [-79.3832, 43.6532], link:"https://globalnews.ca/news/3503234/toronto-foody-mart-racist-verbal-abuse/", tooltip:"Another verbal assault video against an Asian Man"}

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
      var win = window.open(this.state.events[i].link, '_blank');
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
                data-tip={city.tooltip + " in " + city.name + "."}
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
