import React, { useEffect, useState } from 'react'
// import { Outlet } from 'react-router-dom';
import Banner from '../components/Banner'
import Jobs from './Jobs';
import Card from '../components/Card';
import Sidebar from '../sidebar/Sidebar'
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedSector, setSelectedSector] = useState('private');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://localhost:5000/all-jobs")
  //   .then(res => res.json())
  //   .then(data => {
  //   setJobs(data)
  //   setIsLoading(false);
  //   })
  // }, [])

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://localhost:5000/all-gjobs")
  //   .then(res => res.json())
  //   .then(gdata => {
  //   setGjobs(gdata)
  //   setIsLoading(false);
  //   })
  // }, [])

  useEffect(() => {
    setIsLoading(true);
    if (selectedSector === 'private') {
      fetch("http://localhost:5000/all-jobs")
        .then(res => res.json())
        .then(data => {
          setJobs(data);
          setIsLoading(false);
          localStorage.setItem('selectedSector','private');
        });
    } else if (selectedSector === 'government') {
      fetch("http://localhost:5000/all-gjobs")
        .then(res => res.json())
        .then(data => {
          setJobs(data);
          setIsLoading(false);
          localStorage.setItem('selectedSector','governement');
        });
    }
  }, [selectedSector]);

  // console.log(jobs)

  const handleSectorChange =(sector)=>{
    setSelectedSector(sector);
    setCurrentPage(1);
  }

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const[location,setLocation] = useState("");
  const handleInputChange1 = (event) => {
    setLocation(event.target.value)
  }
// job.JobTitle.value
  // filtering jobs by title and location
  const filteredItems = (jobs.filter((job) => job.JobTitle && job.JobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));
  const filteredItems1 = jobs.filter((job) => job.jobLocation && job.jobLocation.toLowerCase().indexOf(location.toLowerCase()) !== -1);

  // Radio filters
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  }

  // button filters
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  }


  // calc index range
  const caluclatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // function for previous page

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // main function
  const filteredData = (jobs, selected, query,location) => {
    let filteredJobs = jobs;
    // filtering input items
    if (query) {
      filteredJobs = filteredItems;
      // console.log(filteredJobs)
    }
    if(location) {
      filteredJobs=filteredItems1;
      // console.log(filteredJobs)
    }

    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate,minPrice }) => (
        jobLocation.toLowerCase() === selected ||
        (parseInt(maxPrice) <= parseInt(selected))||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      ))
      // console.log(filteredJobs);
    }

    // slicing the data based on current page
    const { startIndex, endIndex } = caluclatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />
    )}

  const result = filteredData(jobs, selectedCategory, query,location);
  
  
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} handleInputChange1={handleInputChange1} location={location} />
    
    

      {/* main content */}

      {/* Left side */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 '>

        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* jobs list */}


        <div className='col-span-2 bg-white p-4 rounded-sm'>

        <div className="py-4 space-x-4">
        <button
          className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none ${selectedSector === 'private' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => handleSectorChange('private')}
        >
          Private Jobs
        </button>
        <button
          className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none ${selectedSector === 'government' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => handleSectorChange('government')}
        >
          Government Jobs
        </button>
      </div>
          {
            isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
              <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          }
           {/* {console.log(result.length)}
           {console.log(itemsPerPage)} */}
           {/* {console.log(currentPage)}
           {console.log(filteredItems)}
           {console.log(itemsPerPage)} */}
           
          {/* next and previous  */}
          {
            result.length >= itemsPerPage ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline' >Previous</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}  className='hover:underline'>Next</button>
              </div>
            ) :(<div className='flex justify-center mt-4 space-x-8'>
            <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline' >Previous</button>
            <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
          </div>)
          }
          {/* {console.log(filteredItems)} */}

        </div>
        {/* {console.log(result)} */}


        {/* Right side */}
        <div className='bg-white p-4 rounded'><Newsletter/></div>
      </div>
    </div>


  )
}

export default Home
