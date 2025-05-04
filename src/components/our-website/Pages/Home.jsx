import React from 'react'
import Hero from '../Hero/Hero'
import HowWeWork from '../how-we-work/HowWeWork'
import Services from '../our-service/Services'

const Home = () => {
    return (
        <section style={{maxWidth: "96.2%", marginInline: "auto"}}>
            <Hero />
            <HowWeWork />
            <Services />
        </section>
    )
}

export default Home