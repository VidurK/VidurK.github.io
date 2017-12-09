import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval={10000}>
                <div>
                    <img src="../../public/img/japanese-1.jpg" />
                    <p className="legend">Mere weeks ago, the people in this photo could have held out hope that B.C.’s anti-Japanese hysteria would blow over, and that the extreme measures being touted by B.C. politicians would never receive federal approval. <i>Library and Archives Canada</i></p>
                </div>
                <div>
                    <img src="../../public/img/japanese-2.jpg" />
                    <p className="legend">This is an image of a Japanese-Canadian road crew during internment. It’s published here courtesy of Chris Hope, whose grandfather Ken Okura took the photo with a smuggled camera, as all cameras had been seized by authorities due to suspicions of espionage. <i>Ken Okura/Chris Hope</i></p>
                </div>
                <div>
                    <img src="../../public/img/japanese-3.jpg" />
                    <p className="legend">In this photo from December 10, 1941, a smiling member of the Royal Canadian Navy Volunteer Reserve is chatting up a smiling Japanese woman as the navy completes their round-up of fishing vessels. <i>Library and Archives Canada</i></p>
                </div>
                <div>
                    <img src="../../public/img/japanese-4.jpg" />
                    <p className="legend">One of the first overtures of what would become internment was the immediate mass seizure of any and all vessels owned by Canadians of Japanese heritage. <i>Library and Archives Canada</i></p>
                </div>
                <div>
                    <img src="../../public/img/japanese-5.jpg" />
                    <p className="legend">This is a young David Suzuki, along with his two sisters, photographed during relocation. Suzuki’s last ties to Japan were through his grandparents, who had come to Canada in the early 1900s. <i>Library and Archives Canada</i></p>
                </div>
            </Carousel>
        );
    }
};

export default DemoCarousel
