import React from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import CustomNavigation, {
  CustomPrevButton,
  CustomNextButton,
  CustomPages,
} from './Navigation';

const ExamplePDFViewer2 = () => {
  return (<PDFViewer document={{
    url: '../../public/report.pdf'
  }}
  css="customViewer"
    navigation={{
      elements: {
        previousPageBtn: CustomPrevButton,
        nextPageBtn: CustomNextButton,
        pages: CustomPages
      }
    }} />);
}

export default ExamplePDFViewer2
