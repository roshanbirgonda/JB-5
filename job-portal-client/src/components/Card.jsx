import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    companyLogo,
    JobTitle,
    minPrice,
    startDate,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;
  const reqRole = localStorage.getItem("role");
  const role = reqRole === "seeker" ? true : false;
  const sect = localStorage.getItem("selectedSector");
  // console.log(sect);

  return (
    <>
      {role ? (
        <section className="card">
          <Link
            to={`/job-details/${_id}`}
            className="flex gap-4 flex-col sm:flex-row items-start"
          >
            <img src={companyLogo} alt="" />
            <div>
              <h4 className="text-primary mb-1">{companyName}</h4>
              <h3 className="text-lg font-semibold mb-2">{JobTitle}</h3>
              <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {jobLocation}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock />
                  {employmentType}
                </span>
                <span className="flex items-center gap-2">
                  <FiDollarSign />
                  {minPrice}-{maxPrice}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar />
                  {postingDate}
                </span>
              </div>

              <p className="text-base text-primary/70">{description}</p>
            </div>
          </Link>
        </section>
      ) : (
        <section className="card">
          <Link
            to={`/applied-users/${_id}`}
            className="flex gap-4 flex-col sm:flex-row items-start"
          >
            <img src={companyLogo} alt="" />
            <div>
              <h4 className="text-primary mb-1">{companyName}</h4>
              <h3 className="text-lg font-semibold mb-2">{JobTitle}</h3>
              <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {jobLocation}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock />
                  {employmentType}
                </span>
                <span className="flex items-center gap-2">
                  <FiDollarSign />
                  {minPrice}-{maxPrice}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar />
                  {startDate}
                </span>
              </div>

              <p className="text-base text-primary/70">{description}</p>
            </div>
          </Link>
        </section>
      )}
    </>
  );
};

export default Card;
