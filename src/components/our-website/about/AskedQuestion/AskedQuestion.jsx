import React from "react";
import "./AskedQuestion.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

const AskedQuestion = () => {
  return (
    <div className="AskedQuestion">
      <div className="AskedTextSection">
        <h1>
          Frequently Asked <span>Questions</span>
        </h1>
        <p>
          Find answers to common questions about our home care services. Whether you're a 
          service provider or homeowner, we're here to help you connect seamlessly.
        </p>
      </div>
      <div className="accordions">
        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography className="accordionHeading">
              What is Home CareTaker?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              Home CareTaker is a trusted platform connecting professional service providers 
              with homeowners needing quality home care services. We facilitate everything 
              from cleaning and maintenance to personal care and repairs, ensuring reliable 
              and vetted professionals for every home need.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography className="accordionHeading">
              How do I register as a service provider?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              Simply create an account, complete your profile with your skills and experience, 
              and verify your identity. Once approved, you'll start receiving service requests 
              from homeowners in your area. We handle payments and scheduling to make your work easier.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography className="accordionHeading">
              How do I book a home service?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              Browse our categories, select the service you need, and view available providers 
              in your area. You can compare ratings, prices, and availability before booking. 
              Payment is secure and only released to the provider after you confirm satisfactory service.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography className="accordionHeading">
              Are service providers background-checked?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              Yes, all providers undergo thorough background checks and verification before 
              joining our platform. We verify identities, professional qualifications, and 
              work history to ensure your home and family are in safe hands.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography className="accordionHeading">
              What if I need to cancel or reschedule?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              You can cancel or reschedule up to 24 hours before your appointment with no penalty. 
              For last-minute changes, please contact your service provider directly. We encourage 
              open communication between homeowners and providers for the best experience.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accordion">
          <AccordionSummary
            className="accordionSummary"
            expandIcon={<FontAwesomeIcon icon={faArrowCircleDown} className="accordion-icon" />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            <Typography className="accordionHeading">
              How are payments handled?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="accordionText">
              Payments are processed securely through our platform. Homeowners pay upfront, 
              and funds are held securely until the service is completed to your satisfaction. 
              Providers receive payment within 2 business days after service confirmation.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default AskedQuestion;