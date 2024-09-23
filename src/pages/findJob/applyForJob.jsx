import { useContext, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { apiRequest } from "../../utils/store";
import { GlobalContext } from "../../context";
import { Link } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
// import JobCard from "../../component/jobCard";

export default function Application() {
  // const { loading, setLoading } = useContext(GlobalContext)
  const { user } = useSelector((state) => state.user)
  const { info, setInfo } = useContext(GlobalContext)
  const { id } = useParams()
  const fetchApplications = async () => {
    try {
      let app = await apiRequest({
        url: `/jobs/get-applicants/${id}`,
        method: "GET",
        token: user?.token
      })
      setInfo(app?.data)
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    id && fetchApplications()
  })
  return (
    <div className='w-full flex flex-col pt-20 h-screen'>
      <p className='font-bold text-2xl'>Applicants:</p>
      <div className='grid md:grid-cols-3 px-10'>
        {info?.length === 0 
        ? <h1 className=" px-40 w-full font-bold text-xl pt-20">No Applicant Yet</h1>
        :<>
          {
          info?.map((job, index) => {
            return <div key={index} >
              <Link to={`/applicant-profile/${job._id}/${job.user?._id}`}>
                <div className=' md:w-[20rem] max-w-md
                        flex md:h-[18rem] h-[15rem] rounded-md px-3 py-5 flex flex-col 
                       bg-white justify-between shadow-lg mt-4 rounded-md px-3 py-5 relative'>

                  <div className='flex gap-3'>
                    <img src={job?.user?.profileUrl}
                      alt={job?.user?.firstName}
                      className='w-14 h-14 rounded-lg truncate' />
                    <div>
                      <p className='text-black text-lg font-semibold'>{job?.user?.jobTitle}</p>
                      <p className='text-black text-lg font-semibold'>{job?.user?.jobType}</p>
                      <span className='flex gap-2 items-center text-purple-200'>
                        <GoLocation className='text-slate-900 text-sm ' />
                        {job?.user?.location}
                      </span>
                    </div>
                  </div>
                  <div className=''>
                    <p className='text-sm text-black font-semibold'>
                      {job.user?.about?.slice(0, 150) + "..."}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className="flex gap-6">
                      <button className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>Accept</button>
                      <button className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>Reject</button>
                    </div>
                    <span className='text-purple-900 text-sm'>{moment(job?.appliedAt).fromNow()}</span>
                  </div>
                </div>
              </Link>
            </div>

          })}
        </>}
      </div>
    </div>
  )
}