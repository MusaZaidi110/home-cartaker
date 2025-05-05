import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShieldAlt, 
    faHandshake, 
    faHome,
    faThumbsUp
  } from '@fortawesome/free-solid-svg-icons';
import './HomeFacilities.css'; // We'll extract the CSS into this file



const HomeFacilities = () => {
    const facilities = [
        {
          icon: faShieldAlt,
          text: "VERIFIED PROFESSIONALS"
        },
        {
          icon: faHandshake,
          text: "SATISFACTION GUARANTEE"
        },
        {
          icon: faHome,
          text: "LOCAL SERVICE PROVIDERS"
        },
        {
          icon: faThumbsUp,
          text: "RATED & REVIEWED SERVICES"
        }
      ];

  return (
    <section className="facility" id="facility">
      <div className="facility-container">
        {facilities.map((facility, index) => (
          <div className="facility-box" key={index}>
            <div className="facility-icon">
              <FontAwesomeIcon icon={facility.icon} />
            </div>
            <p>{facility.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFacilities;