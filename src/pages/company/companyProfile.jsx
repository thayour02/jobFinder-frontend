import { Fragment, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context'
import { useParams } from 'react-router-dom'
import CustomButton from '../../component/customButton'
import Loading from '../../component/loading'
import { FiEdit3, FiPhoneCall, FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import TextInput from '../../component/textInput'
import { useSelector, useDispatch } from 'react-redux'
import { apiRequest, handleFileUpload } from '../../utils/store'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Login } from '../../redux/slice'
import { toast, Toaster } from "react-hot-toast"
import { FaDeleteLeft } from "react-icons/fa6";
import { LogOut } from '../../redux/slice'
import { accountType } from '../../utils/data'
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md";


const CompanyForm = () => {
    const { open, setOpen } = useContext(GlobalContext)
    const { user } = useSelector((state) => state.user)

    const { register, handleSubmit, formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { ...user }
    });
    const dispatch = useDispatch()
    const { loading, setLoading } = useContext(GlobalContext)
    const [profileImg, setProfileImg] = useState("")


    const onSubmit = async (data) => {
        try {
            const img = profileImg && (await
                handleFileUpload(profileImg));
            const newData = img ? { ...data, profileUrl: img } : data
            const result = await apiRequest({
                url: "/update-profile",
                token: user?.token,
                data: newData,
                method: "PUT"
            })
            setLoading(false)
            if (result.status === false) {
                toast.error({ ...result.error });
            } else {
                toast.success(result.message)
                dispatch(Login(data))
                localStorage.setItem("userInfo", JSON.stringify(data))
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };
    return (
        <>
            <Transition appear show={open || false} >
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
                                        Edit Company Profile
                                    </Dialog.Title>
                                    <form className='w-full mt-2 flex flex-col gap-5'
                                        onSubmit={handleSubmit(onSubmit)}>
                                        <TextInput
                                            name='name'
                                            label="Name of the company"
                                            placeholder='eg. Comfort'
                                            type='text'
                                            register={register("name", {
                                                required: 'Company name is required'
                                            })}
                                            error={errors.email ? errors.email.message : ""}
                                        />
                                        <TextInput
                                            name='location'
                                            label="Location/Address"
                                            placeholder='eg.Lagos'
                                            type='text'
                                            register={register("location", {
                                                required: 'Location is required'
                                            })}
                                            error={errors.location ? errors.location.message : ""}
                                        />
                                        <TextInput
                                            name="url"
                                            label="Company Website"
                                            placeholder="Company Website"
                                            type="text"
                                            register={register("url")}
                                        />
                                        <div className='w-1/2 flex gap-2'>
                                            <TextInput
                                                name='contact'
                                                label="Contact"
                                                placeholder='+234....'
                                                type='string'
                                                register={register("contact", {
                                                    required: 'Contact  is required'
                                                })}
                                                error={errors.contact ? errors.contact.message : ""}
                                            />
                                            <div className='w-1/2 mt-2'>
                                                <label className='text-sm mb-1'>Company Logo</label>
                                                <input type="file"
                                                    onChange={(e) => setProfileImg(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="" className='mb-1 text-gray-600'>About Your Company</label>
                                            <textarea name="" id="" className='rounded border border-gray-400
                                             focus:outline-none focus:border-blue-500 focus:ring-1
                                             text-base px-4 py-2 resize-none'
                                                rows={4} cols={6} {...register("about", {
                                                    required: "write about your company"
                                                })} aria-invalid={errors.about ? "true" : "false"}>
                                            </textarea>
                                            {errors.about && (
                                                <span className='text-red-400'>{errors.about?.message}</span>
                                            )}
                                        </div>
                                        <div className='mt-2'>
                                            <CustomButton
                                                type='submit'
                                                containerStyles={`inline-flex justify-center 
                                             rounded-md bg-purple-200 text-xl font-semibold hover:bg-blue-400 w-2/4 h-8`}
                                                disabled={loading}
                                                title={
                                                    loading ? <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : `Submit`
                                                } />
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

export default function CompanyProfile() {
    const { open, setOpen } = useContext(GlobalContext)
    const { setLoading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)

    const { user } = useSelector((state) => state.user)

    const fetchCompany = async () => {
        setLoading(true)
        try {
            let res = await apiRequest({
                url: "/get-company-profile",
                method: "GET",
            })
            console.log(res)
            setInfo(res?.data)
            setLoading(false)
        } catch (error) {
            return error;
        }
    }
    useEffect(() => {
        fetchCompany();
        window.scrollTo({top:0, left:0, behavior:"smooth"})
    },[])

    const dispatch = useDispatch()
    const handledeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            try {
                await apiRequest({
                    url: '/delete-profile',
                    method: "DELETE",
                    token: user?.token
                })
                dispatch(LogOut())
                window.location.replace('/')
            } catch (error) {
                return error;
            }
        }
    }
    return (
        <div className='conatiner mx-auto p-5'>
            <div>
                <Toaster position='top-left' toastOptions={{ duration: 6000 }} />
                <div className='w-full flex justify-between flex-col md:flex-row gap-3 pt-20'>
                    <div className='flex items-center'>
                        <h2 className='text-xl font-semibold'>{info?.name}</h2>
                        {info?.isVerified === true
                            ? <FcApproval className='' />
                            : <MdOutlineVerified className='' />
                        }
                    </div>
                    <Link to={info?.url}>{info?.url || <span>No company website</span>}</Link>
                    <div>
                                <CustomButton
                                    onClick={() => setOpen(true)}
                                    iconRight={<FiEdit3 />}
                                    containerStyles={`py-1.5 md:px-5 bg-black/60 text-white  px-3 bg-purple-500 
                                    rounded-full text-base focus:outline-none hover:bg-white`} />
                                <Link to='/upload-job'>
                                    <CustomButton
                                        onClick={() => setOpen(true)}
                                        iconRight={<FiUpload />}
                                        containerStyles={`py-1.5 md:px-5 bg-black/60 text-white  px-3 bg-purple-500
                                        rounded-full text-base focus:outline-none hover:bg-white`} />
                                </Link>
                                <CustomButton
                                    onClick={handledeleteProfile}
                                    iconRight={<FaDeleteLeft />}
                                    containerStyles={`py-1.5 md:px-5 bg-black/60 text-white  px-3 bg-purple-500
                                    rounded-full text-base focus:outline-none hover:bg-white`} />
                            </div>
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
            <CompanyForm opem={open} setOpen={setOpen} />
        </div>
    )
}
