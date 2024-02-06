import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const PostResume = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    // const storedEmail = localStorage.getItem('email');
    const storedResume = JSON.parse(localStorage.getItem("resume"));
    const resinfo = JSON.parse(localStorage.getItem("info"));
    console.log(resinfo);
    // console.log(storedResume);
    // if (storedEmail) {
    //   setEmail(storedEmail);
    // }

    if (storedResume) {
      setResume(storedResume);
      setIsResumeUploaded(true);
    }

    if (resinfo) {
      setInfo(resinfo);
      reset({
        fullName: resinfo.fullName,
        email: resinfo.email,
        number: resinfo.number,
        description: resinfo.description,
      });
    }
  }, [reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("description", data.description);
    formData.append("resume", data.resume[0]);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/post-res", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resumes = await response.json();

      if (resumes.acknowledged === true) {
        setResume(resumes);
        setIsResumeUploaded(true);
        // setEmail(data.email);
        setInfo(data);
        // localStorage.setItem('email', data.email);
        localStorage.setItem("resume", JSON.stringify(resumes));
        localStorage.setItem("info", JSON.stringify(data));

        alert("Resume has been uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  // console.log(email);

  const deleteResume = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/all-res/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(id);
      if (result.acknowledged === true) {
        setIsResumeUploaded(false);
        alert("Resume has been deleted successfully!");

        // localStorage.removeItem('email');
        localStorage.removeItem("resume");
        localStorage.removeItem("info");
        reset();
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const viewRes = async (id) => {
    try {
      window.open(`http://localhost:5000/view-resume/${id}`, "_blank");
    } catch (error) {
      console.error("Error getting the resume: ", error);
    }
  };

  return (
    <>
      <form
        className="px-8 py-8 bg-gray-100"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-semibold leading-7 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
            Personal details and application.
          </p>
          {/* <div className='flex justify-end'>
        <button className='flex text-lg justify-end text-purple-600 hover:underline'>View Resume</button>
        </div> */}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register("fullName")}
                  type="text"
                  pattern="[a-zA-Z]+"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Email
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register("email")}
                  // value={resinfo.email}
                  type="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Mobile Number
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register("number")}
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Description
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <textarea
                  className="w-full pl-3 py-1.5 focus-outline placeholder:text-gray-700"
                  rows={6}
                  placeholder="About Yourself"
                  {...register("description")}
                  required
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Resume
              </dt>
              <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register("resume")}
                  type="file"
                  accept="application/pdf"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 px-4 sm:px-0">
          {!isResumeUploaded ? (
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-blue focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Submit Application
            </button>
          ) : (
            <button
              type="submit"
              disabled={true}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Submit Application
            </button>
          )}

          <div className="flex justify-end mt-6 px-4 sm:px-0">
            {isResumeUploaded && (
              <>
                <button
                  type="button"
                  onClick={() => deleteResume(resume.insertedId)}
                  // {...console.log(resume.insertedId)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 ml-2"
                >
                  Delete Resume
                </button>
                <button
                  type="button"
                  onClick={() => viewRes(resume.insertedId)}
                  // {...console.log(resume.insertedId)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 ml-2"
                >
                  View Resume
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PostResume;
