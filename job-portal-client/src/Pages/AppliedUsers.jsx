import {React,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

const AppliedUsers = () => {

    // const { id } = useParams();
    // const [job, setJob] = useState({});
    // useEffect(() => {
    //   fetch(`http://localhost:5000/all-jobs/${id}`)
    //     .then((res) => res.json())
    //     .then((data) => setJob(data));
    // }, [id]);
  
  
    // const handleApply = async () => {
      
    // }
    // const {_id} = job;
  return (
    <div>
      <h1 className='text-xl'>Applied Users</h1>
      {/* <h1>{_id}</h1> */}
    </div>
  )
}

export default AppliedUsers;