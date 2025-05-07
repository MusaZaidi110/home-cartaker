import React from 'react'
import Hero from '../Hero/Hero'
import HomeAbout from '../home-about/HomeAbout'
import HomeFacilities from '../home-facilities/HomeFacilities'
import HowWeWork from '../how-we-work/HowWeWork'
import Services from '../our-service/Services'
import TestimonialSlider from '../testimonials/TestimonialSlider'

const Home = () => {
    return (
        <section style={{ maxWidth: "96.2%", marginInline: "auto" }}>
            <Hero />
            <HomeAbout />
            <HomeFacilities />
            <HowWeWork />
            <Services />
            <TestimonialSlider />
        </section>
    )
}

export default Home