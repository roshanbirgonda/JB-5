import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable'


const PostJob = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [sect , setSect] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const handleChange = (option)=>{
    setSect(option)
  }

  const  onSubmit =async (data) => {

    data.skills = selectedOption;
    // data.JobTitle= selectedTitle;
    // console.log(data)
    fetch("http://localhost:5000/post-job", {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((result) =>{
      // console.log(result);
      if (result.acknowledged === true){
        alert("!!! Job has posted successfully !!!");
      }
      reset()
    })
  }

  const onSubmitg = async (data)=>{
    console.log('Submitting government job form with data:', data);
    fetch("http://localhost:5000/post-gjob",{
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then((result)=>{

      if (result.acknowledged===true) {
        alert("!!! Job has posted successfully !!!");
      }
      reset();
    })
  }

  const options = [
    { value: "javascript", label: "javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Redux", label: "Redux" },
  ]
 
  

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>
      <div className='flex py-4'>
      <button
        className={`inline-block mr-4 px-4 ${sect==='private'? 'bg-white text-blue':'bg-blue text-white'} border border-solid border-blue rounded cursor-pointer transition duration-100 ease-in-out  hover:bg-white hover:text-blue focus:outline-none focus:ring focus:border-blue`}
        onClick={()=>handleChange('private')}
        type="radio">
        Private Jobs
      </button>
      <button
        className={`inline-block px-4 py-2 border border-solid ${sect==='govt'? 'bg-white text-green':'bg-green text-white'} border-green rounded cursor-pointer transition duration-100 ease-in-out hover:bg-white hover:text-green focus:outline-none focus:ring focus:border-green-300`}
        onClick={()=>handleChange('govt')}
        type="radio">
        Government Jobs
      </button>
      </div>
        {
        sect==='private'?(<form onSubmit={handleSubmit(onSubmit)} className='space-y-5 py-5'>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Web Developer" {...register("JobTitle",)} className='create-job-input' required/>

            {/* <CreatableSelect
              defaultValue={setSelectedTitle}
              onChange={setSelectedTitle}
              options={titles}
              className='create-job-input py-4' required/>             */}
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
              <input type="text" pattern="^[1-9]\d*k$"  placeholder="$20k " {...register("minPrice",)} className='create-job-input' required/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input type="text" pattern="^[1-9]\d*k$" placeholder="$120k" {...register("maxPrice",)} className='create-job-input' required/>
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
        </form>)
        :
        (<form onSubmit={handleSubmit(onSubmitg)} className='space-y-5 py-5'>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:General Manager" {...register("JobTitle",)} className='create-job-input' required/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Sector</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Railway" {...register("JobSector",)} className='create-job-input' required/>
            </div>
          </div>

          {/* 2nd Row */}

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Start Date</label>
              <input type="date" placeholder="Ex:7/12/2023" {...register("startDate",)} className='create-job-input' required/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>End Date</label>
              <input type="date" placeholder="Ex:7/12/2023" {...register("endDate",)} className='create-job-input' required/>
            </div>
          </div>

          {/* 3rd row */}

          <div className='create-job-flex'>          
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Department</label>
              <input type="text" pattern='[a-zA-Z ]+' placeholder="Ex:Administration" {...register("jobDepartment",)} className='create-job-input' required/>
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

          {/* 6th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>


              <label className='block mb-2 text-lg'>Governement Job link</label>
              <input type="url" placeholder="Paste your company logo URL: https://" {...register("govtlink",)} className='create-job-input' required/>
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>EmploymentType</label>
              <select {...register("employmentType")} className='create-job-input' required>
                <option value="">choose your Employment Type</option>
                <option value="Full-time">Permanent</option>
                <option value="Part-time">Contract</option>
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
        </form>)
        }
      </div>
    </div>
  )
}

export default PostJob
