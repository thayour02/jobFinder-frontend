import { Link } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
// import { accountType } from '../utils/data'
// import { useSelector } from 'react-redux'
// import { useState } from 'react'


const JobCard = ({ job }) => {
    return (
        <Link to={`/job-details/${job?._id}`}>
            <div className='  md:w-[20rem]  
                                 flex md:h-[18rem] h-[15rem] rounded-md  py-5 flex flex-col 
                                bg-white justify-between shadow-lg mt-4 rounded-md px-3 py-5 relative'>

                <div className='flex justify-between '>
                    <div className='flex gap-3'>
                        <img src={job?.logo}
                            alt={job?.name}
                            className='w-14 h-14 rounded-lg truncate' />
                        <div>
                            <p className='text-black text-lg font-semibold'>{job?.jobTitle}</p>
                            <p className='text-black text-lg font-semibold'>{job?.jobType}</p>
                            <span className='flex gap-2 items-center text-purple-200'>
                                <GoLocation className='text-slate-900 text-sm ' />
                                {job?.location}
                            </span>
                        </div>
                    </div>
                    <h1 className='text-bold text-purple-500 font-bold -mt-5'>{job?.vacancy}</h1>
                </div>
                <div className=''>
                    <p className='text-sm text-black font-semibold w-full'>
                        {job?.detail[0]?.desc?.slice(0, 150) + "..."}
                    </p>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>{job?.jobType}</p>
                    <span className='text-purple-900 text-sm'>{moment(job?.createdAt).fromNow()}</span>
                </div>
            </div>


        </Link>

    )

}

export default JobCard