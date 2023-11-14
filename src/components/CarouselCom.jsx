import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import img1 from '../assets/carousel/img1.png'
import img2 from '../assets/carousel/img2.jpg'
import img3 from '../assets/carousel/img3.jpg'

const CarouselCom = () => {
    return (
        <div>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselCom