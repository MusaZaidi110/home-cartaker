import React from 'react'
import ContactHero from '../contact/ContactHero/ContactHero'
import ContactForm from '../contact/ContactForm/ContactForm'

const Contact = () => {
  return (
    <section style={{maxWidth: "96.2%", marginInline: "auto"}}>
      <ContactHero />
      <ContactForm />
    </section>
  )
}

export default Contact