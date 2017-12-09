import React from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import CustomNavigation, {
  CustomPrevButton,
  CustomNextButton,
  CustomPages,
} from './Navigation';

const ExamplePDFViewer = () => {
  return (<PDFViewer document={{
    url: '../../public/amend_indian_act.pdf'
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

export default ExamplePDFViewer
