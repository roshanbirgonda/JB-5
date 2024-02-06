// import {React,useState,useEffect} from 'react'
// import { useParams } from 'react-router-dom';

// const AppliedUsers = () => {

//     // const { id } = useParams();
//     // const [job, setJob] = useState({});
//     // useEffect(() => {
//     //   fetch(`http://localhost:5000/all-jobs/${id}`)
//     //     .then((res) => res.json())
//     //     .then((data) => setJob(data));
//     // }, [id]);

//     // const handleApply = async () => {

//     // }
//     // const {_id} = job;
//   return (
//     <div>
//       <h1 className='text-xl'>Applied Users</h1>
//       {/* <h1>{_id}</h1> */}
//     </div>
//   )
// }

// export default AppliedUsers;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppliedUsers = () => {
  const { id } = useParams();
  const [appliedUsers, setAppliedUsers] = useState([]);

  useEffect(() => {
    const fetchAppliedUsers = async () => {
      console.log(id);
      try {
        const response = await fetch(
          `http://localhost:5000/applied-users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch applied users");
        }
        const data = await response.json();
        setAppliedUsers(data);
      } catch (error) {
        console.error("Error fetching applied users:", error.message);
      }
    };

    fetchAppliedUsers();
  }, [id]);
  const viewRes = async (id) => {
    try {
      window.open(`http://localhost:5000/view-resume/${id}`, "_blank");
    } catch (error) {
      console.error("Error getting the resume: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Applied Users</h1>
      <div>
        {appliedUsers.map((user) => (
          <div key={user._id}>
            <h2>Name: {user.fullName}</h2>
            <p>Email: {user.email}</p>
            <p>Number: {user.number}</p>
            <p>Description: {user.description}</p>
            <button type="button" onClick={() => viewRes(user.seekerId)}>
              View Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedUsers;
