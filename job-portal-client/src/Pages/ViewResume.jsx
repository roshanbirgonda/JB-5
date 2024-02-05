// import React from 'react';
// import { useForm } from 'react-hook-form';
// import {Link, useParams,useLoaderData} from 'react-router-dom';
// // import { PaperClipIcon } from '@heroicons/react/20/solid';

// const ViewResume = () => {
//   const { register, handleSubmit,reset } = useForm();
//   // const {fullName,email,number,description}=useLoaderData();
//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append('fullName', data.fullName);
//     formData.append('email', data.email);
//     formData.append('number', data.number);
//     formData.append('description', data.description);
//     formData.append('resume', data.resume[0]); // Assuming data.resume is a FileList

//     try {
//       const response = await fetch("http://localhost:5000/post-res", {
//         method: "PATCH",
//         body: formData,
//       });

//       const resume = await response.json();

//       if (resume.acknowledged === true) {
//         alert("Resume has posted successfully!!!");
//       }

//       reset(); // Reset the form after successful submission
//     } catch (error) {
//       console.error('Error uploading resume:', error);
//     }
//   };


//   return (
//     <form className='px-8 py-8 bg-gray-100' encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
//       <div className="px-4 sm:px-0">
//         <h3 className="text-xl font-semibold leading-7 text-gray-900">Applicant Information</h3>
//         <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">Personal details and application.</p>
//         <div className='text-lg'>
//         {/* <Link to={`/view-res`} className='flex justify-end text-purple-600 hover:underline'>View Resume</Link> */}
//         </div>
//       </div>
//       <div className="mt-6 border-t border-gray-100">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-lg font-medium leading-6 text-gray-900" >Full name</dt>
//             <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <input
//                 {...register('fullName')}
//                 type="text"
//                 // defaultValue={fullName}                
//                 className="border border-gray-300 rounded-md p-2 w-full"
//                 required
//               />
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <div className="mt-6 ">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-lg font-medium leading-6 text-gray-900">Email</dt>
//             <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <input
//                 {...register('email')}
//                 type="email"
//                 // defaultValue={email}
//                 className="border border-gray-300 rounded-md p-2 w-full"
//                 required
//               />
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <div className="mt-6">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-lg font-medium leading-6 text-gray-900">Mobile Number</dt>
//             <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <input
//                 {...register('number')}
//                 type="tel"
//                 pattern='[0-9]{10}'
//                 // defaultValue={number}
//                 required
//                 className="border border-gray-300 rounded-md p-2 w-full"
//               />
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <div className="mt-6">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-lg font-medium leading-6 text-gray-900">Description</dt>
//             <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//             <textarea className='w-full pl-3 py-1.5 focus-outline placeholder:text-gray-700'
//             rows={6}
//             placeholder='About Yourself'
//             {...register("description",)}
//             // defaultValue={description}
//              required/>
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <div className="mt-6">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-lg font-medium leading-6 text-gray-900">Resume</dt>
//             <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <input
//                 {...register('resume')}
//                 type="file"
//                 accept='application/pdf'
//                 required
//                 className="border border-gray-300 rounded-md p-2 w-full"
//               />
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <div className="mt-6 px-4 sm:px-0">
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         >
//           Submit Application
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ViewResume;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const PostJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('JobTitle', data.JobTitle);
    formData.append('companyName', data.companyName);
    formData.append('minPrice', data.minPrice);
    formData.append('maxPrice', data.maxPrice);
    formData.append('salaryType', data.salaryType);
    formData.append('jobLocation', data.jobLocation);
    formData.append('postingDate', data.postingDate);
    formData.append('experienceLevel', data.experienceLevel);
    formData.append('skills', JSON.stringify(selectedOption));
    formData.append('companyLogo', data.companyLogo);
    formData.append('employmentType', data.employmentType);
    formData.append('description', data.description);
    formData.append('postedBy', data.postedBy);

    try {
      const response = await fetch("http://localhost:5000/post-job", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.acknowledged === true) {
        alert("Job has posted successfully!!!");
      }

      reset();
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const options = [
    { value: "javascript", label: "javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Redux", label: "Redux" },
  ];


  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 py-10'>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Web Developer" {...register("JobTitle",)} className='create-job-input' required/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Name</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Google" {...register("companyName",)} className='create-job-input' required/>
            </div>
          </div>

          {/* 2nd Row */}

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Minimum Salary</label>
              <input type="text" pattern="[a-zA-Z0-9-]" placeholder="$20k " {...register("minPrice",)} className='create-job-input' required/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input type="text" pattern="[a-zA-Z0-9-]" placeholder="$120k" {...register("maxPrice",)} className='create-job-input' required/>
            </div>
          </div>

          {/* 3rd row */}

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Salary Type</label>
              <select {...register("salaryType")} className='create-job-input' required>
                <option value="">choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Location</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Hyderabad" {...register("jobLocation",)} className='create-job-input' required/>
            </div>
          </div>

          {/* 4th row */}

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>


              <label className='block mb-2 text-lg'>Job Posting Date</label>
              <input type="date" placeholder="Ex:7/12/2023" {...register("postingDate",)} className='create-job-input' required/>
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Experience Level</label>
              <select {...register("experienceLevel")} className='create-job-input' required>
                <option value="">choose your Experience</option>
                <option value="NoExperience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>

          </div>

          {/* 5th row */}
          <div>
            <label className='block mb-2 text-lg'>Required Skill Sets</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className='create-job-input py-4' required/>
          </div>

          {/* 6th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>


              <label className='block mb-2 text-lg'>Company Logo</label>
              <input type="url" placeholder="Paste your company logo URL: https://wyimage.com/img1" {...register("companyLogo",)} className='create-job-input' required/>
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>EmploymentType</label>
              <select {...register("employmentType")} className='create-job-input' required>
                <option value="">choose your Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

          </div>

          {/* 7th row */}
          <div className='w-full'>
            <label className='block mb-2 text-lg'>Job Description</label>
            <textarea className='w-full pl-3 py-1.5 focus-outline-none placeholder:text-gray-700'
            rows={6}
            defaultValue={"Provide a detailed description of the job role and responsibilities."}
            
            placeholder='Job Description'
            {...register("description",)} required/>
          </div>
        {/* 8th row */}
        <div className='w-full'>
          <label className='block mb-2 text-lg'>Recruiter</label>
          <input type="email" pattern="[^ @]*@[^ @]*" placeholder="Your email" {...register("postedBy",)} className='create-job-input' required/>
        </div>

          <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
        </form>
      </div>
    </div>
  )
}

export default PostJob
