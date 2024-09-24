import { useParams } from "react-router-dom"
import { useContext, useEffect, useState, Fragment } from "react";
import moment from "moment";
import CustomButton from "../../component/customButton";
import { GoLocation } from "react-icons/go";
import { AiOutlineSafetyCertificate, AiOutlineLoading3Quarters } from "react-icons/ai";
import JobCard from "../../component/jobCard";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../../context";
import { apiRequest } from "../../utils/store";
import { toast, Toaster } from "react-hot-toast"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Login } from "../../redux/slice";
import { Transition, Dialog } from '@headlessui/react'


const ApplicationForm = () => {
  const { open, setOpen } = useContext(GlobalContext)
  const { setInfo } = useContext(GlobalContext)
  const { loading, setLoading } = useContext(GlobalContext)

  const { user } = useSelector((state) => state.user)
  const { handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { ...user }
  });

  let params = useParams()
  const userId = user?._id;
  const jobId = params.id;
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setOpen(false)
    setLoading(true)
    try {
      const apply = await apiRequest({
        url: `/apply-job/${userId}/${jobId}`,
        method: "POST",
        data: data,
        token: user?.token
      })
      // console.log(apply)
      // if(!user?.token){
      //   toast.error("authorisation failed... please logging")
      //  setTimeout(()=>{
      //   window.location.replace('/auth')
      //  },1000)
      // }
      if (apply?.status === false){
        toast.error(...apply.message)
      } else {
        toast.success(apply?.message)
        setInfo(apply?.data)
        dispatch(Login(data))
        setLoading(false)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      return toast.error(error)
    }
  }
  return (
    <>
      <Transition appear show={open}>
        <Dialog className="realtive   z-10" as='div' onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset- opacity-bg-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95' className=""
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl 
                   bg-white mt-20 p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-xl font-bold  '>
                    Upload Your Cv
                  </Dialog.Title>
                  <form className='w-full mt-2 flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}>
                    <Toaster position='top-center' toastOptions={{ duration: 8000 }} />
                    <div>
                      {/* <div className='w-1/2 mt-2'>
                        <label htmlFor="" className='text-sm mb-1'>CV</label>
                        <input type="file"
                          onChange={(e) => setUploadCv(e.target.files[0])} />
                      </div>
                      <div className='w-1/2 mt-2'>
                        <label htmlFor="" className='text-sm mb-1'>CV</label>
                        <input type="file"
                          onChange={(e) => setUploadCv(e.target.files[0])} />
                      </div> */}
                      <div className='mt-2'>
                        <CustomButton
                          type='submit'
                          containerStyles={`inline-flex justify-center 
                              rounded-md bg-purple-200 text-xl font-semibold hover:bg-blue-400 `}
                          disabled={loading}
                          title={
                            loading ? <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : `Submit`
                          }
                        />
                      </div>
                    </div>
                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>

  )
}
export default function Jobdetails() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user)
  const [job, setJob] = useState(null)
  const [selected, setSelected] = useState('0')
  const { isFetching, setIsFetching } = useContext(GlobalContext)
  const { similarJob, setSimilarJob } = useContext(GlobalContext)
  const { open, setOpen } = useContext(GlobalContext)
  const { info, setInfo } = useContext(GlobalContext)


  const getJobDetails = async () => {
    setIsFetching(true)
    try {
      const res = await apiRequest({
        url: `/jobs/job-detail/${id}`,
        method: "GET"
      })
      setJob(res?.data)
      setSimilarJob(res?.similarJob)
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      return error
    }
  }
  useEffect(() => {
    id && getJobDetails()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  },[id,similarJob,job,isFetching])


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
  },[id,info])


  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        {
          let deleteJob = await apiRequest({
            url: "/jobs/delete-job/" + id,
            token: user?.token,
            method: "DELETE"
          })
          if (deleteJob?.status === true) {
            toast.success(deleteJob.message)
            setIsFetching(false)
          }
        }
        window.location.replace('/')
      } catch (error) {
        setIsFetching(false)
        return toast.error(error)
      }
    }
  }


  return (
    <div>
      {isFetching ? <div className="mt-10 flex justify-center px-40 h-screen pt-10 w-full" disabled={isFetching}>
        <AiOutlineLoading3Quarters size={100} className="align-items-center text-purple-200 animate-spin w-full h-full" />
      </div>
        :
        <div className="container mx-auto pt-20">
          <div className="w-full  flex flex-col md:flex-row gap-10 ">
            <div className="w-full h-fit bg-white shadow-md md:w-2/3 2xl:2/4 px-2 py-10 ">
              <div className="w-full flex  items-center justify-between">
                <div className="w-3/4 flex gap-2" >
                  <Toaster position='top-right' toastOptions={{ duration: 9000 }} />
                  <img src={job?.company?.profileUrl}
                    alt={job?.company?.name}
                    className="w-20 h-20 md:w-24 md:h-20 rounded" />
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">{job?.jobTitle}</p>

                    <span className="font-semibold" >{job?.jobType}</span>
                    <div className="flex items-center gap-2">
                      <GoLocation color="purple" />
                      <span className="font-semibold">{job?.location}</span>

                    </div>
                    <span>{moment(job?.createdAt).fromNow()}</span>
                  </div>
                </div>
                <div className="">
                  <AiOutlineSafetyCertificate
                    className="text-3xl text-purple-600" />
                </div>
              </div>

              <div className="relative my-10 w-full grid grid-cols-3 gap-6 md:flex-row  items-center justify-between ">
                <div className=" text-white bg-gradient-to-b from-black/60 to-black 
                  w-30 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">Salary</span>
                  <p className="text-lg font-semibold">${job?.salary}</p>
                </div>

                <div className=" text-white bg-gradient-to-b from-black/60 to-black w-30
                 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">Job Type</span>
                  <p className="text-lg font-semibold">{job?.jobType}</p>
                </div>
                <div>
                  {user?._id === job?.company?._id ?
                    <Link to={`/applications/${job?._id}`} className=" text-white bg-gradient-to-b from-black/60 to-black w-30
                  h-16 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-sm font-semibold">No. of Applicants</span>
                      {
                        job?.application?.length > 0 
                       ? <p className="text-lg font-semibold">{job?.application?.length}</p>
                        :""
                      }
                    
                    </Link> : <p className=" text-white bg-gradient-to-b from-black/60 to-black w-30
                h-16 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-sm font-semibold">No. of Applicants</span>
                      <p className="text-lg font-semibold">{job?.application?.length}</p>
                    </p>}
                </div>
                <div className=" text-white bg-gradient-to-b from-black/60 to-black 
                w-30 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">No. of Vacancy</span>
                  <p className="text-lg font-semibold">{job?.vacancy}</p>
                </div>
                <div className=" text-white bg-gradient-to-b from-black/60 to-black 
                w-30 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">Yr. of Experience</span>
                  <p className="text-lg font-semibold">{job?.experience}</p>
                </div>
              </div>

              <div className="w-full flex gap-4 py-5">
                <CustomButton
                  onClick={() => setSelected('0')}
                  title='Job Description'
                  containerStyles={`w-full justify-center  flex py-3 px-5 outline-none  hover:bg-purple-200 hover:text-white
                  rounded-full border ${selected === '0'
                      ? "bg-black text-white"
                      : "bg-white text-black border border-purple-200"
                    }`} />
                <CustomButton
                  onClick={() => setSelected('1')}
                  title='Company'
                  containerStyles={`w-full items-center justify-center flex py-3 px-5 outline-none  hover:bg-purple-200 hover:text-white
                  rounded-full border ${selected === '1'
                      ? "bg-black text-white"
                      : "bg-white text-black border border-purple-200"
                    }`} />
              </div>
              <div className="my-6">
                {selected === "0" ? (
                  <>
                    <p className="text-xl font-semibold">Job Description</p>
                    <span>{job?.detail[0]?.desc}</span>
                    {
                      job?.detail[0]?.requirement && (
                        <>
                          <p className="text-xl font-semibold mt-8">Requirement:</p>
                          <span className="text-base">{job?.detail[0]?.requirement}</span>
                        </>
                      )
                    }
                  </>
                ) : (
                  <>
                    <div className="mb-6 flex flex-col gap-2 px-2">
                      <p className="text-xl text-purple-800 font-bold">{job?.company?.name}</p>
                      <div className="flex items-center gap-2">
                        <GoLocation size={30} />
                        <span className="text-base font-semibold">{job?.company?.location}</span>
                      </div>
                      <p className="text-base">{job?.company?.email}</p>
                    </div>
                    <p className="text-xl font-bold">About Company</p>
                    <span>{job?.company?.about}</span>
                  </>
                )}
              </div>
              <div>
                {user?._id === job?.company?._id
                  ? (<CustomButton
                    title='Delete Job'
                    onClick={handleDeletePost}
                    containerStyles={`w-full items-center flex justify-center bg-red-500 font-bold text-white py-3 px-5 
                    rounded-full text-base outline-none hover:bg-red-800`} />)
                  :
                  (<CustomButton
                    title='Apply Now'
                    onClick={() => setOpen(true)}
                    containerStyles={`w-full items-center flex justify-center bg-black text-white py-3 px-5 
                   rounded-full text-base outline-none hover:bg-purple-800`} />)

                }
              </div>
            </div>
            {user?._id === job?.company?._id ?
              <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
                <p className='font-bold'>Applicants:</p>

                <div className='md:flex-row flex flex-wrap gap-3'>
                  {info?.length === 0 
                    ? <h1 className=" p-40 font-bold text-2xl ">No Applicant Yet</h1>
                    : <>
                      {
                        info?.map((job, index) => {
                          return <div key={index} >
                            <Link to={`/applicant-profile/${job._id}/${job?.user?._id}`}>
                              <div className=' md:w-[20rem] max-w-md
                        flex md:h-[18rem] h-[15rem] rounded-md px-3 py-5 flex flex-col 
                       bg-white justify-between shadow-lg mt-4 rounded-md px-3 py-5 relative'>
                                <h1>
                                  {job?.application?.id}
                                </h1>
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
                                  <div className="flex  gap-2">
                                    <button className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>Accept</button>
                                    <button className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>Reject</button>
                                  </div>
                                  <span className='text-purple-900 text-sm'>{moment(job?.appliedAt).fromNow()}</span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        })}
                    </>
                  }
                </div>
              </div>
              : <div className="w-full md:w-1/3 2xl:w-2/4 p-5 mt-10 md:mt-0">
                <p className="text-gray-500 text-2xl font-bold">Similar Job :</p>
                <div className="md:flex-row flex flex-wrap  gap-3">
                  {similarJob?.slice(0, 4).map((job, index) => {
                    const data = {
                      name: job?.company?.name,
                      logo: job?.company?.profileUrl,
                      ...job
                    }
                    return <JobCard job={data} key={index} />
                  }
                  )}
                </div>
              </div>
            }
          </div>
        </div>
        }
      <ApplicationForm open={open} setOpen={setOpen} />
    </div>
  )
}
