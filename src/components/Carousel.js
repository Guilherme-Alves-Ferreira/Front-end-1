import React, { useState, useEffect } from 'react'
import iconMale from '../assets/images/icon_male.png'

function Carousel(){

    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            var teste = slides[i];
            teste.style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "");
        }
        //slides[slideIndex-1].className = "aparecer"; 
        //dots[slideIndex-1].className += "active";
    }
    return(
        <>
            <div className="slideshow-container">

                <div className="mySlides fade">
                    <img src={iconMale}/>
                </div>

                <div className="mySlides fade">
                    <img src={iconMale}/>
                </div>

                <a className="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a className="next" onclick="plusSlides(1)">&#10095;</a>

            </div>
        </>
    )
}

export default Carousel;