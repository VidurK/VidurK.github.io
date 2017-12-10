import React from "react";
import ReactDOM from "react-dom";
import { Alert, Button } from 'reactstrap';

import WorldMap from "./components/WorldMap"
import DemoCarousel from "./components/Carousel"
import ExamplePDFViewer from "./components/PDFViewer"
import ExamplePDFViewer2 from "./components/PDFViewer2"
ReactDOM.render(<WorldMap />, document.getElementById("app"));
ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));
ReactDOM.render(<ExamplePDFViewer />, document.querySelector('.pdf-viewer'));
ReactDOM.render(<ExamplePDFViewer2 />, document.querySelector('.pdf-viewer2'));
