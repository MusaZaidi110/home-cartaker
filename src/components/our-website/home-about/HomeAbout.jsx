import React from "react";
import './HomeAbout.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsers,
    faUserTie,
    faShieldHalved
  } from '@fortawesome/free-solid-svg-icons';

import HomeAbout1 from '../../../assets/HomeAbout1.jpg'
import HomeAbout2 from '../../../assets/HomeAbout2.jpg'
import HomeAbout3 from '../../../assets/HomeAbout3.jpg'
import HomeAbout4 from '../../../assets/HomeAbout4.jpg'

export default function About() {
    const about = [
        {
          icon: <FontAwesomeIcon icon={faUsers} className="about-icon" />,
          text: "Happy Clients",
          count: "6,940+",
          description: "Families we've served"
        },
        {
          icon: <FontAwesomeIcon icon={faUserTie} className="about-icon" />,
          text: "Verified Vendors",
          count: "140+",
          description: "Professional service providers"
        },
        {
          icon: <FontAwesomeIcon icon={faShieldHalved} className="about-icon" />,
          text: "Service Guarantee",
          count: "100%",
          description: "Satisfaction protected"
        }
      ];

    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <h1 className="about-title">
                            Welcome to <span className="highlight">Home CareTaker</span>
                        </h1>
                        <p className="about-description">
                            Home CareTaker redefines home care by combining professional expertise with personal
                            attention. Our certified caretakers provide comprehensive solutions - from
                            maintenance and repairs to personal care services - all delivered with
                            reliability and compassion. We're not just service providers; we're your
                            partners in creating a safe, comfortable, and well-maintained home
                            environment.
                        </p>
                        <div className="about-stats">
                            {about.map((item, key) => (
                                <div key={key} className="stat-item">
                                    <div className="stat-box">
                                        <div className="stat-content">
                                            {item.icon}
                                            <h2 className="stat-count">{item.count}</h2>
                                            <p className="stat-text">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="about-images">
                        <div className="image-grid">
                            <div className="image-col image-col-right">
                                <img
                                    className="about-img about-img-1"
                                    src={HomeAbout1}
                                />
                            </div>
                            <div className="image-col image-col-left">
                                <img
                                    className="about-img about-img-2"
                                    src={HomeAbout2}
                                />
                            </div>
                            <div className="image-col image-col-right">
                                <img
                                    className="about-img about-img-3"
                                    src={HomeAbout3}
                                />
                            </div>
                            <div className="image-col image-col-left">
                                <img
                                    className="about-img about-img-4"
                                    src={HomeAbout4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}