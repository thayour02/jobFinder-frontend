import {useCallback, useContext, useEffect} from 'react'
import { GlobalContext } from '../../context'
import { useParams } from 'react-router-dom'
import { FiPhoneCall} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
import { useSelector} from 'react-redux'
import { apiRequest } from '../../utils/store'

import { accountType } from '../../utils/data'
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md";


export default function CompanyProfileById() {
    // const { open, setOpen } = useContext(GlobalContext)
    const { setLoading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)

    const params = useParams()
    const { user } = useSelector((state) => state.user)

    const fetchCompany = useCallback( async () => {
        setLoading(true)
        let id = params?.id || user?._id;
       
        try {
            let res = await apiRequest({
                url: `/get-company/${id}`,
                method: "GET",
            })
            console.log(res)
            setInfo(res?.data)
            setLoading(false)
        } catch (error) {
            return error;
        }
    },[params?.id, user?._id])
    useEffect(() => {
        fetchCompany();
    },[fetchCompany])

    
    return (
        <div className='conatiner mx-auto p-5'>
            <div>
                <div className='w-full flex justify-between flex-col md:flex-row gap-3 pt-20'>
                    <div className='flex items-center'>
                        <h2 className='text-xl font-semibold'>{info?.name}</h2>
                        {info?.isVerified === true
                            ? <FcApproval className='' />
                            : <MdOutlineVerified className='' />
                        }
                    </div>
                    <Link to={info?.url}>{info?.url || <span>No company website</span>}</Link>
               
                </div>
                <div className='w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text:sm'>
                    <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                        <HiLocationMarker />
                        {info?.location ?? 'No Location'}
                    </p>
                    <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                        <AiOutlineMail />
                        {info?.email ?? "No Emaill"}
                    </p>
                    <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                        <FiPhoneCall />
                        {info?.contact ?? "No Contact"}
                    </p>

                </div>
                <div className='flex flex-col items-center mt-10 md:mt-0'>
                    <span className='text-xl'>{info?.jobPosts?.length}</span>
                    <p className='text-purple-500'>Job Post</p>
                </div>
            </div>
            <div className='w-full mt-20 flex flex-col'>
                <p className='font-bold'>Job Posted:</p>
                <div className='grid md:grid-cols-3 gap-4 '>
                    {
                        info?.jobPosts?.map((job, index) => {
                            return (
                                <>
                                    <Link key={index} to={`/job-details/${job?._id}`}>
                                        <div className=' md:w-[20rem] max-w-md
                       flex md:h-[18rem] h-[18rem] rounded-md px-3 py-5 flex flex-col 
                        bg-white justify-between shadow-lg mt-4 rounded-md px-3 py-5 relative'>

                                            <div className='flex justify-between'>
                                                <div className='flex gap-3'>
                                                    <img src={info?.profileUrl}
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
                                                {accountType !== "Seeker" && info._id === user._id
                                                    ? <h1 className='font-bold text-red-500 -mt-5 font-bold '>{
                                                        job?.application.length > 0 ? job?.application.length : ""
                                                    }</h1>
                                                    : <h1 className='font-bold text-green-500 -mt-5 font-bold '>{job?.vacancy}</h1>
                                                }

                                            </div>
                                            <div className=''>
                                                <p className='text-sm text-black font-semibold'>
                                                    {job?.detail[0]?.desc?.slice(0, 150) + "..."}
                                                </p>
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <p className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>{job?.jobType}</p>
                                                <span className='text-purple-900 text-sm'>{moment(job?.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
