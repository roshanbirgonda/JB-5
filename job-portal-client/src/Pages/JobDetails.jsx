import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const sect = localStorage.getItem("selectedSector");

  useEffect(() => {
    if (sect === "private") {
      fetch(`http://localhost:5000/all-jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data));
    } else if (sect === "governement") {
      fetch(`http://localhost:5000/all-gjobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data));
    }
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem("token"); // Replace 'your_bearer_token_here' with your actual bearer token

    //const formData = new FormData();
    // Add your form data to the formData object here...

    fetch(`http://localhost:5000/apply-job/${id}`, {
      method: "POST",
      body: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Applied to the job successfully!!");
  };

  const {
    _id,
    companyName,
    companyLogo,
    JobTitle,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = job;

  return (
    <section className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
      <Link
        to={`/job-details/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-36 w-36 rounded"
        />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{JobTitle}</h3>
          <div className="text-primary text-3xl text-bold flex flex-wrap gap-2 mb-2">
            <ol className="list-decimal my-4">
              <li>job id : {_id}</li>
              <li>Company Name: {companyName}</li>
              <li>Designation: {JobTitle}</li>
            </ol>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>

      <button
        className="bg-green px-8 py-2 my-2 text-white rounded-full"
        onClick={handleApply}
      >
        Apply Now
      </button>
    </section>
  );
};

export default JobDetails;
