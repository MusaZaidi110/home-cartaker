import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Services.css'
import servicesJson from '../../../constants/services.json';
import serviceDetailImg from '../../../assets/service-detail.jpg';
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

import Button from '../../../elements/button/Button';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Convert id to number
  const categoryId = parseInt(id, 10);

  // Find the category by ID
  const category = servicesJson.mainCategories.find(
    cat => cat.id === categoryId
  );

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

  if (!category) {
    return (
      <div className="error-message">
        <h2>Category not found</h2>
        <p>We couldn't find the category you're looking for.</p>
        <p>ID searched: {id}</p>
      </div>
    );
  }

  return (
    <div className="service-details">
      <div className="serviceDetails-Left">
        <div className="serviceDetail-Heading">
          <h1 className='categoryName' style={{ color: "#4a89dc" }}>{category.name}</h1>
          <p className='categoryDescription'>{category.description}</p>
        </div>

        <div className="serviceCategoryList">
          {category.services.map((service) => (
            <div key={service.id} style={{ marginTop: "18px", marginBottom: "18px" }}>
              {typeof service === 'object' ? (
                <React.Fragment>
                  <div className="List">
                    <div className="ListImgSection">
                      <FontAwesomeIcon icon={iconMap[category.name] || faToolbox} />
                    </div>

                    <div className="ListTextSection">
                      <h1>{service.name}</h1>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                service
              )}
            </div>
          ))}
        </div>
        <Button text={"Book Service"} onclick={() => navigate('/request-service')}/>
      </div>
      <div className="serviceDetails-Right">
        <img src={serviceDetailImg} alt="Service Detail Image" />
      </div>
    </div>
  );
};

export default ServiceDetails;