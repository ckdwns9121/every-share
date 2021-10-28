import React, { Component } from "react";
import Slider from "react-slick";
import styles from './Layout.module.scss';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

interface Props {
    children : React.ReactNode
}

const SlickSide =({children} : Props)=>{

    return(
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default SlickSide;