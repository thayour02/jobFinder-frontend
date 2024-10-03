

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { GlobalContext } from '../../context'
import { HiLocationMarker } from 'react-icons/hi'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'
import { apiRequest } from "../../utils/store"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsPersonFill } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import NoProfile from '../../assets/images.jpeg'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CustomButton from '../../component/customButton'
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md"
import {toast, Toaster} from "react-hot-toast"


const Applicants = () => {
    const { loading} = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)
    const {  setStatus } = useContext(GlobalContext)
    const {  setInfoo } = useContext(GlobalContext)


    const { user } = useSelector((state) => state.user)
    const { applicationId } = useParams()
    const { userId } = useParams()
    const fetchApplicant = async () => {
        try {
            const response = await apiRequest({
                url: `/applicant/${applicationId}/${userId}`,
                method: "GET",
                token: user?.token
            })
            setInfo(response)
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        fetchApplicant()
    })

    const params = useParams()
    const handlesetStatus = async (newStatus) => {
        const { applicationId } = params
        const { userId } = params
        try {
          const app =  await apiRequest({
                url: `/update-application/${applicationId}/${userId}`,
                method: "PUT",
                data: { status: newStatus },
                token: user?.token
            })

            setStatus(newStatus);
            setInfoo(prevInfo => ({
                ...prevInfo,
                application: prevInfo.application.map(app =>
                    app._id === applicationId ? { ...app, status: newStatus } : app
                )
            }))
            toast.success(app?.message)
        } catch (error) {
            return error
        }
    }

    return (
        <div>
            {loading ? <div className="h-screen items-center mt-10 flex justify-center px-40" disabled={loading}>
                <AiOutlineLoading3Quarters size={100} className="align-items-center text-purple-200 animate-spin w-full h-full pt-20" />
            </div>
                :

                <div className='container mx-auto py-10 flex items-center justify-center pt-20'>
                    <Toaster toastOptions={{duration:3000}} position='top-left'/>
                    <div className='w-full md:w-2/3 2xl:w-2/3 bg-white shadow-lg p-10 pb-20 rounded-lg'>
                        <div className='flex flex-col items-center justify-center mb-8'>
                            <div className='flex '>
                            <h1 className='text-4xl font-semibold'>{info?.application?.user.firstName + " " + info?.application?.user.LastName}</h1>
                            {info?.application?.user.isVerified === true
                                ? <FcApproval className='mt-4' />
                                : <MdOutlineVerified className='mt-4' />
                            }
                            </div>
                            {user?.accountType !== "Seeker" && (
                                <div>
                                    <CustomButton
                                        onClick={() => handlesetStatus("Approved")}
                                        title="Accept"
                                        containerStyles={`py-1.5 md:px-5 bg-black/60 text-white  px-3 bg-purple-500 
                                            rounded-full mb-4  focus:outline-none hover:bg-white hover:text-purple-900`} />

                                    <CustomButton
                                        onClick={() => handlesetStatus("Rejected")}
                                        title="Reject"
                                        containerStyles={`py-1.5 md:px-5 bg-black/60 text-white  px-3 bg-purple-500 
                                            rounded-full mb-4  focus:outline-none hover:bg-white hover:text-purple-900`} />
                                </div>

                            )}

                            <h4 className='text-purple-600 text-base font-bold mt-1'>{info?.application?.user.jobTitle || "Add Job Title"}</h4>
                            <div className='w-full shadow-lg gap-2 flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text:sm'>
                                <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                                    <HiLocationMarker />
                                    {info?.location ?? 'No Location'}
                                </p>
                                <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                                    <AiOutlineMail />
                                    {info?.application?.user.email ?? "No Emaill"}
                                </p>
                                <p className='flex gap-2 items-center px-3 py-1 rounded-full'>
                                    <FiPhoneCall />
                                    {info?.application?.user.contact ?? "No Contact"}
                                </p>
                            </div>
                        </div>

                        <div className=' cursor-pointer shadow-lg gap-1 flex flex-col md:flex-row justify-start md:justify-between mt-4 -ml-8 md:mt-8 text:sm'>
                            <a className='flex space-x-1 items-center px-3 py-1 rounded-full' href={info?.application?.user.socialMedia?.linkedin}>
                                <span>linkedin</span>
                                <FaLinkedin />
                            </a>
                            <a className='flex space-x-1 items-center px-3 py-1 rounded-full' href={info?.application?.user.socialMedia?.github}>
                                <span>
                                    Github
                                </span>
                                <FaGithub />
                            </a>
                            <a className='flex  space-x-1  items-center px-3 py-1 rounded-full' href={info?.application?.user.socialMedia?.github}>
                                <span>Facebook</span>
                                <FaFacebook />
                            </a>
                            <a className='flex  space-x-0.5  items-center px-3 py-1 rounded-full' href={info?.application?.user.socialMedia?.github}>
                                <span>Twitter</span>
                                <FaXTwitter />
                            </a>
                            <a className='flex  space-x-0.5 items-center px-3 py-1 rounded-full' href={info?.application?.user.socialMedia?.github}>
                                <span>Portfolio </span>
                                <BsPersonFill />
                            </a>
                        </div>
                        <hr />
                        <div className='w-full py-10'>
                            <div className='w-full flex flex-col-reverse md:flex-row gap-8 py-6'>
                                <div className='w-full md:w-2/3 flex flex-col gap-4 mt-20 md:mt-0'>
                                    <p className='text-purple-800 font-bold text-2xl'>ABOUT</p>
                                    <span className='text-justify leading-7'>{info?.application?.user.about || "about user"}</span>
                                </div>
                                <div className='w-full md:w-1/3 flex flex-col items-center'>
                                    <img src={info?.application?.user.profileUrl || NoProfile}
                                        className='h-40 w-48  object-container 
                                     rounded-md bg-white' alt={info?.application?.user.profileUrl || NoProfile} />
                                    <div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Applicants