import { useContext, Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalContext } from '../../context'
import { HiLocationMarker } from 'react-icons/hi'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'
import { Transition, Dialog } from '@headlessui/react'
import TextInput from '../../component/textInput'
import CustomButton from '../../component/customButton'
import { useForm } from 'react-hook-form'
import { apiRequest, handleFileUpload } from "../../utils/store"
import { Login } from '../../redux/slice'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsPersonFill } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FiEdit3 } from 'react-icons/fi'
import NoProfile from '../../assets/images.jpeg'
import { TiUserDelete } from "react-icons/ti";
import { toast, Toaster } from "react-hot-toast"
import { useEffect } from 'react'
import { GoLocation } from 'react-icons/go'
import { LogOut } from '../../redux/slice'
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md";






const UserProfileForm = () => {
  const [profileImg, setProfileImg] = useState("")
  const { open, setOpen } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.user)
  const { register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user }
  });
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setOpen(false)
    try {
      const img = profileImg && (await
        handleFileUpload(profileImg));
      const newData = img ? { ...data, profileUrl: img } : data
      const result = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT"
      })
      if (result.status === false) {
        toast.error(result.message);
      } else {
        toast.success(result.message)
        dispatch(Login(data))
        localStorage.setItem("userInfo", JSON.stringify(data))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  };
  return (
    <>
      <Transition appear show={open} >
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
          <div className='fixed w-full inset-0 overflow-y-auto'>
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
                <Dialog.Panel className='max-w-md transform overflow-hidden rounded-2xl 
               bg-white mt-20 p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-xl font-bold  '>
                    Edit User Profile
                  </Dialog.Title>
                  <form action="" className='w-full mt-2 flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex gap-2'>
                      <div className='w-1/2'>
                        <TextInput
                          name='firstName'
                          label="firstName"
                          placeholder='eg. Comfort'
                          required={true}
                          type='text'
                          register={register("firstName", {
                            required: 'FirstName is required'
                          })}
                          error={errors.firstName ? errors.firstName.message : ""}
                        />
                      </div>
                      <div className='w-1/2'>
                        <TextInput
                          name='LastName'
                          label="LastName"
                          placeholder='eg. Comfort'
                          required={true}
                          type='text'
                          register={register("LastName", {
                            required: 'LastName is required'
                          })}
                          error={errors.LastName ? errors.LastName.message : ""}
                        />
                      </div>
                    </div>
                    <div>
                      <TextInput
                        name='location'
                        label="Location/Address"
                        placeholder='eg. Lagos'
                        type='text'
                        register={register("location", {
                          required: 'Location is required'
                        })}
                        error={errors.location ? errors.location.message : ""}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="socialMedia[0]facebook"
                        label="Facebook"
                        placeholder="Facebook"
                        type="text"
                        register={register("facebook")}
                      />
                      <TextInput
                        name="socialMedia[0]linkedin"
                        label="linkedin"
                        placeholder="linkedin"
                        type="text"
                        register={register("linkedin")}
                      />
                      <TextInput
                        name="socialMedia[0]twitter"
                        label="twitter"
                        placeholder="twitter"
                        type="text"
                        register={register("twitter")}
                      />
                      <TextInput
                        name="socialMedia[0]portfolio"
                        label="portfolio"
                        placeholder="portfolio"
                        type="text"
                        register={register("portfolio")}
                      />
                      <TextInput
                        name="socialMedia[0]github"
                        label="github"
                        placeholder="github"
                        type="text"
                        register={register("github")}
                      />
                    </div>
                    <div className='w-full flex gap-2'>
                      <div className='w-1/2'>
                        <TextInput
                          name='contact'
                          label="Contact"
                          placeholder='Phone Number'
                          type='Number'
                          register={register("contact", {
                            required: 'Contact  is required'
                          })}
                          error={errors.contact ? errors.contact.message : ""}
                        />
                      </div>
                      <div className='w-1/2'>
                        <TextInput
                          name='jobTitle'
                          label="JobTitle"
                          placeholder='eg. software engineer'
                          type='text'
                          register={register("jobTitle", {
                            required: 'jobTitle  is required'
                          })}
                          error={errors.jobTitle ? errors.jobTitle.message : ""}
                        />
                      </div>

                    </div>
                    <div className='flex gap-6'>
                      <div className='w-1/2 mt-2'>
                        <label htmlFor="" className='text-sm mb-1'>Upload Picture</label>
                        <input type="file"
                          onChange={(e) => setProfileImg(e.target.files[0])} />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="" className='mb-1 text-gray-600'>About You</label>
                      <textarea name="" id="" className='rounded border border-gray-400
                   focus:outline-none focus:border-blue-500 focus:ring-1
                    text-base px-4 py-2 resize-none' rows={4} cols={6} {...register("about", {
                        required: "write about you"
                      })} aria-invalid={errors.about ? "true" : "false"}></textarea>
                      {errors.about && (
                        <span className='text-red-400'>{errors.about?.message}</span>
                      )}
                    </div>
                    <div className='mt-2'>
                      <CustomButton
                        type='submit'
                        containerStyles={`inline-flex justify-center 
                        rounded-md bg-purple-200 text-xl font-semibold hover:bg-blue-400 w-1/4 h-8 border-2 border-black `}
                        disabled={loading}
                        title={
                          loading ? <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : `Submit`
                        }
                      />
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

export default function UserProfile() {
  const { open, setOpen } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const { info, setInfo } = useContext(GlobalContext)


  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let res = await apiRequest({
          url: '/users/get-user',
          method: "GET",
          token: user?.token
        })
        setInfo(res?.data)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchUserProfile()
  })


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        let del = await apiRequest({
          url: '/users/delete-user',
          method: "DELETE",
          token: user?.token
        })
        if (del.status === false) {
          toast.error({ ...del.message })
        } else {
          toast.success(del.message)
          dispatch(LogOut())
          window.location.replace('/auth')
        }
      } catch (error) {
        return console.log(error)
      }
    }
  }
  return (
    <div>
      {
        loading ? <div className="mt-10 flex justify-center px-40" disabled={loading}>
          <AiOutlineLoading3Quarters size={100} className="align-items-center text-purple-200 animate-spin w-full h-full" />
        </div>
          : <div>
             <div className='container mx-auto py-10 flex items-center justify-center pt-20'>
              <div className='w-full md:w-2/3 2xl:w-2/3 bg-white shadow-lg p-10 pb-20 rounded-lg'>
                <div className='flex flex-col items-center justify-center mb-4'>
                  <div className='flex space-x-2 items-center'>
                  <h1 className='text-4xl font-semibold'>{info?.firstName + " " + info?.LastName}</h1>
                  {info?.isVerified ===  true
                      ?<FcApproval className='mt-4'/>
                    : <MdOutlineVerified className='mt-4'/>
                  }
                  </div>
                  <h4 className='text-purple-600 text-base font-bold mt-1'>{info?.jobTitle || "Add Job Title"}</h4>
                  <div className='w-full shadow-lg gap-2 flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text:sm'>
                  <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
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
                </div>
                <div className='w-full cursor-pointer  shadow-lg flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text:sm'>
                  <a className='flex  space-x-1  items-center px-2 py-1 rounded-full' href={info?.socialMedia?.linkedin}>
                    <span>linkedin</span>
                    <FaLinkedin />
                  </a>
                  <a className='flex space-x-1  items-center px-2 py-1 rounded-full' href={info?.socialMedia?.github}>
                    <span>
                      Github
                    </span>
                    <FaGithub />
                  </a>
                  <a className='flex  space-x-1 items-center px-2 py-1 rounded-full' href={info?.socialMedia?.github}>
                    <span>Facebook</span>
                    <FaFacebook />
                  </a>
                  <a className='flex  space-x-1  items-center px-2 py-1 rounded-full' href={info?.socialMedia?.github}>
                    <span>Twitter</span>
                    <FaXTwitter />
                  </a>
                  <a className='flex  space-x-1 items-center px-2 py-1 rounded-full' href={info?.socialMedia?.github}>
                    <span>Portfolio </span>
                    <BsPersonFill />
                  </a>
                </div>
                <hr />
                <div className='w-full py-10'>
                  <div className='w-full flex flex-col-reverse md:flex-row gap-8 py-6'>
                    <div className='w-full md:w-2/3 flex flex-col gap-4 mt-20 md:mt-0'>
                      <p className='text-purple-800 font-bold text-2xl'>ABOUT</p>
                      <span className='text-justify leading-7'>{info?.about || "about user"}</span>
                    </div>
                    <div className='w-full md:w-1/3 mt-10  flex flex-col items-center'>
                      <img src={info?.profileUrl || NoProfile}
                        className='h-40 w-48  object-container 
                       rounded-md bg-white' alt={info?.profileUrl || NoProfile} />
                      <div className='flex text-base  gap-2 mt-10 -ml-8'>
                        <CustomButton
                          onClick={() => setOpen(true)}
                          iconRight={<FiEdit3 />}
                          title="Edit"
                          containerStyles={`py-1.5 w-1/2 text-xl font-bold md:px-5 bg-black/60 text-white  px-3 bg-purple-500 
                             rounded-full mb-4  focus:outline-none hover:bg-white hover:text-purple-900`} />
                          <CustomButton
                            onClick={handleDelete}
                            iconRight={<TiUserDelete />}
                            title="Delete"
                            containerStyles={`py-1.5 text-xl h-10 font-bold md:px-5 bg-black/60 text-white  px-3 bg-purple-500
                                 rounded-full focus:outline-none hover:bg-red-200 hover:text-white`} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full mt-20 flex flex-col px-4'>
              <h1 className='font-bold text-2xl'>Total Job Applied For: <span>{info?.application?.length}</span></h1>
              <div className=' md:flex flex-wrap gap-4'>
                {info?.application?.map((job, index) => {
                  return <div key={index} >
                    <Link to={`/job-details/${job.job?._id}`}>
                      <div className=' md:w-[20rem] max-w-md
                       flex md:h-[18rem] h-[15rem] rounded-md px-3 py-5 flex flex-col 
                        bg-white justify-between shadow-lg mt-4 rounded-md px-3 py-5 relative'>
                       <div className='flex justify-between'>
                       <div className='flex gap-3'>
                          <img src={job?.job?.company.profileUrl}
                            alt={job?.job?.name}
                            className='w-14 h-14 rounded-lg truncate' />
                          <div>
                            <h1 className='text-black text-lg font-semibold'>{job?.job?.company.name}</h1>
                            <p className='text-black text-lg font-semibold'>{job?.job?.jobTitle}</p>
                            <p className='text-black text-lg font-semibold'>{job.job?.jobType}</p>
                            <span className='flex gap-2 items-center text-purple-200'>
                              <GoLocation className='text-slate-900 text-sm ' />
                              {job.job?.location}
                            </span>
                          </div>
                        </div>
                        <h1 className='-mt-5 font-bold  text-purple-400'>{job?.job?.vacancy}</h1>
                       </div>
                        <div className=''>
                          <p className='text-sm text-black font-semibold'>
                            {job?.job?.detail[0]?.desc?.slice(0, 150) + "..."}
                          </p>
                        </div>

                        <div className='flex items-center justify-between mt-4 '>
                          <p className='bg-purple-200 text-black py-0.5 px-1.5 rounded font-semibold '>{job?.status}</p>
                          <span className='text-purple-900 text-sm'>${job?.job.salary}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                })}
              </div>
            </div>

            <UserProfileForm open={open} setOpen={setOpen} />
          </div>
      }
    </div>



  )
}
