import React from 'react';
import './Services.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench,
  faBolt,
  faPaintRoller,
  faBroom,
  faToolbox,
  faPaw,
  faLaptop,
  faAmbulance,
  faEllipsisH,
  faSpa,
  faTshirt,
  faCar,
  faCalendarAlt,
  faTruckMoving,
  faChalkboardTeacher,
  faLeaf,
  faTools
} from '@fortawesome/free-solid-svg-icons';

import servicesJson from "../../../constants/services.json";
import { useNavigate } from 'react-router-dom';

const Services = () => {
  // Map category names to icons
  const iconMap = {
    "Plumbing & Water Services": faWrench,
    "Electrical Services": faBolt,
    "Cleaning & Pest Control": faBroom,
    "Painting & Renovation": faPaintRoller,
    "Carpentry & Furniture Services": faToolbox,
    "Appliance Repair": faTools,
    "Personal Care & Wellness": faSpa,
    "Laundry & Clothing": faTshirt,
    "Vehicle Services": faCar,
    "Pet Care Services": faPaw,
    "Event Services": faCalendarAlt,
    "Moving & Shifting": faTruckMoving,
    "Tech Services": faLaptop,
    "Tutoring": faChalkboardTeacher,
    "Gardening": faLeaf,
    "Health Services": faAmbulance,
    "Miscellaneous": faEllipsisH
  };

  const servicesData = servicesJson?.mainCategories || [];
  const defaultDescription = "Professional services for your home needs";

  return (
    <div className="ServicesContainer">
      <div className="ServicesTextContainer">
        <div className="ServicesText">
          <h1>
            Expert <span>Home Services</span>, We Provide
          </h1>
          <p>
            From emergency repairs to routine maintenance, our trusted professionals deliver quality
            solutions at your doorstep. Book instantly, and enjoy hassle-free service
            without leaving home.
          </p>
        </div>
      </div>
      {servicesData.length > 0 ? (
        <div className="services-content">
          {servicesData.map((category) => (
            <ServiceBox
              key={category.id}
              icon={<FontAwesomeIcon icon={iconMap[category.name] || faToolbox} />}
              title={category.name}
              description={category.description || defaultDescription}
              id={category.id} // Pass the category ID
            />
          ))}
        </div>
      ) : (
        <div className="no-services">No services available at the moment.</div>
      )}
    </div>
  );
};

const ServiceBox = ({ icon, title, description, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${id}`);
  };

  return (
    <div className="box" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="icon-wrapper">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Services;