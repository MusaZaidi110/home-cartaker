import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import WorkCard from "./WorkCard";

import PriceNote from "../../../assets/dollarIcon.png";
import Booking from "../../../assets/Booking.svg";
import Calendar from "../../../assets/Calendar.svg";
import DriverPlatform from "../../../assets/DriverPlatform.svg";
import Support from "../../../assets/Support.svg";
import Verification from "../../../assets/verification.svg";
import Location from "../../../assets/location.svg";
import Payment from "../../../assets/payment.svg";
import Rating from "../../../assets/rating.svg";

import "./HowWeWork.css";

const HowWeWork = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="WorksContainer">
      <div className="WorkTextContainer">
        <div className="WorkText">
          <h1>
            How <span>Home CareTaker</span> Works
          </h1>
          <p>
            Whether you're a homeowner needing expert services or a skilled
            professional ready to work, our seamless platform connects you
            effortlessly. Select your role to begin!
          </p>
        </div>
        <div className="WorkTabs">
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              <Tab label="Service Provider" value="1" />
              <Tab label="Homeowner" value="2" />
            </TabList>

            <div className="TabsCards">
              <TabPanel value="1">
                <WorkCard
                  img={Verification}
                  title={"Complete Your Profile"}
                  description={
                    "Register with your business details, service offerings, and professional credentials for verification."
                  }
                />
                <WorkCard
                  img={Location}
                  title={"Set Your Service Area"}
                  description={
                    "Define the geographical area you're willing to serve to get matched with nearby customers."
                  }
                />
                <WorkCard
                  img={Calendar}
                  title={"As You Availability"}
                  description={
                    "Update your calendar with available time slots when you can accept service requests."
                  }
                />
                <WorkCard
                  img={PriceNote}
                  title={"Set Your Rates"}
                  description={
                    "Determine competitive pricing for your services with options for hourly or fixed rates."
                  }
                />
                <WorkCard
                  img={Booking}
                  title={"Receive User Requests"}
                  description={
                    "Get matched with homeowners in your area and accept jobs that fit your schedule."
                  }
                />
                <WorkCard
                  img={Payment}
                  title={"Get Paid Securely"}
                  description={
                    "Receive payments directly through our platform upon job completion with no hassle."
                  }
                />
                
              </TabPanel>

              <TabPanel value="2">
                <WorkCard
                  img={Location}
                  title={"Describe Your Need"}
                  description={
                    "Tell us what service you require, your location, and any specific details about the job."
                  }
                />
                <WorkCard
                  img={DriverPlatform}
                  title={"Find Verified Providers"}
                  description={
                    "Browse profiles of nearby service providers with ratings, reviews, and pricing."
                  }
                />
                <WorkCard
                  img={Booking}
                  title={"Book Your Service"}
                  description={
                    "Select a provider, choose a convenient time, and confirm your booking instantly."
                  }
                />
                <WorkCard
                  img={Support}
                  title={"Real-Time Updates"}
                  description={
                    "Receive notifications about your booking status and communicate directly with your provider."
                  }
                />
                <WorkCard
                  img={Payment}
                  title={"Secure Payment"}
                  description={
                    "Pay securely through our platform only after you're satisfied with the service."
                  }
                />
                <WorkCard
                  img={Rating}
                  title={"Rate Your Experience"}
                  description={
                    "Help maintain quality standards by providing feedback about your service provider."
                  }
                />

              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;