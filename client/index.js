import React from "react";
import ReactDOM from "react-dom";
import { Alert, Button } from 'reactstrap';

import WorldMap from "./components/WorldMap"
import DemoCarousel from "./components/Carousel"
import ExamplePDFViewer from "./components/PDFViewer"

ReactDOM.render(<WorldMap />, document.getElementById("app"));
ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));
ReactDOM.render(<ExamplePDFViewer />, document.querySelector('.pdf-viewer'));
