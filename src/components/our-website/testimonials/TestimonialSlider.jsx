import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TestimonialSlider.css";

import Testimonial1 from "../../../assets/Testimonial1.jpg"
import Testimonial2 from "../../../assets/Testimonial2.jpg"
import Testimonial3 from "../../../assets/Testimonial3.jpg"
import Testimonial4 from "../../../assets/Testimonial4.jpg"
import Testimonial5 from "../../../assets/Testimonial5.jpg"
import Testimonial6 from "../../../assets/Testimonial6.jpg"

const testimonials = [
    {
        name: "Sarah Thompson",
        service: "Drain Cleaning/Unclogging",
        image: Testimonial1,
        text: "Home CareTaker provided exceptional service for my drain cleaning needs. Their team was efficient, thorough, and always professional."
    },
    {
        name: "James Patel",
        service: "Smart Home Setup",
        image: Testimonial2,
        text: "I felt completely comfortable with Home CareTaker's smart home installation. Their technicians became like family during the setup process."
    },
    {
        name: "Maria Rodriguez",
        service: "Deep Home Cleaning",
        image: Testimonial3,
        text: "The thoroughness and dedication shown by Home CareTaker's cleaning team is truly remarkable. I am grateful for the sparkling results they delivered."
    },
    {
        name: "Michael Andrews",
        service: "Furniture Repair",
        image: Testimonial4,
        text: "Knowing my antique furniture was in good hands with Home CareTaker gave us such peace of mind. Their carpentry team truly goes above and beyond."
    },
    {
        name: "Linda Wu",
        service: "Massage Therapy",
        image: Testimonial5,
        text: "As someone with chronic pain, having massage therapy from Home CareTaker was life-changing. I feel more relaxed and pain-free after each session."
    },
    {
        name: "Ayesha Khan",
        service: "Pet Grooming",
        image: Testimonial6,
        text: "From the first call to the ongoing service, Home CareTaker made pet grooming seamless and stress-free. My dog looks forward to every visit!"
    }
];



export default function TestimonialSlider() {
    return (
        <section className="testimonial-container">
            <div className="testimonial">
                <Swiper
                    className="mySwiper"
                    slidesPerView={1}
                    grabCursor={true}
                    loop={true}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="slide">
                                <img src={t.image} alt={t.name} className="image" />
                                <span className="job">{t.service}</span>
                                <p>{t.text}</p>
                                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon"/>
                                <div className="details">
                                    <span className="name">{t.name}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
