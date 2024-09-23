
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
import { toast } from "react-hot-toast"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md"


export default function UserProfileId() {
    const { loading, setLoading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)
    const { user } = useSelector((state) => state.user)

    const params = useParams()
    const fetchUser = async () => {
        setLoading(true);
        try {
            const id = params?.id || user?._id;
            const res = await apiRequest({
                url: `/users/get-user/${id}`,
                method: "GET",
            });
            if (res?.status === false) {
                toast.error(res.error)
                setLoading(false)
            } else {
                toast.success(res.message)
                setInfo(res?.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            return error
        }
    };
    useEffect(() => {
        fetchUser();
    });

    return (
        <div>
            {loading ? <div className="mt-10 flex justify-center px-40" disabled={loading}>
                <AiOutlineLoading3Quarters size={100} className="align-items-center text-purple-200 animate-spin w-full h-full pt-20" />
            </div>
                :
                <div className='container  mx-auto py-10 flex items-center justify-center pt-20'>
                    <div className='w-full md:w-2/3 2xl:w-2/3 bg-white shadow-lg p-10 pb-20 rounded-lg'>
                        <div className='flex flex-col items-center justify-center mb-8'>
                            <h1>Hello👋</h1>
                            <h1 className='text-4xl font-semibold'>{info?.firstName + " " + info?.LastName}</h1>
                  {info?.isVerified ===  true
                      ?<FcApproval className='mt-4'/>
                    : <MdOutlineVerified className='mt-4'/>
                  }
                            <h4 className='text-purple-600 text-base font-bold mt-1'>{info?.jobTitle || "Add Job Title"}</h4>
                            <div className='w-full shadow-lg gap-2 flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text:sm'>
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

                        <div className=' cursor-pointer shadow-lg gap-1 flex flex-col md:flex-row justify-start md:justify-between mt-4 -ml-8 md:mt-8 text:sm'>
                            <a className='flex space-x-1 items-center px-3 py-1 rounded-full' href={info?.socialMedia?.linkedin}>
                                <span>linkedin</span>
                                <FaLinkedin />
                            </a>
                            <a className='flex space-x-1 items-center px-3 py-1 rounded-full' href={info?.socialMedia?.github}>
                                <span>
                                    Github
                                </span>
                                <FaGithub />
                            </a>
                            <a className='flex  space-x-1  items-center px-3 py-1 rounded-full' href={info?.socialMedia?.github}>
                                <span>Facebook</span>
                                <FaFacebook />
                            </a>
                            <a className='flex  space-x-0.5  items-center px-3 py-1 rounded-full' href={info?.socialMedia?.github}>
                                <span>Twitter</span>
                                <FaXTwitter />
                            </a>
                            <a className='flex  space-x-0.5 items-center px-3 py-1 rounded-full' href={info?.socialMedia?.github}>
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
                                <div className='w-full md:w-1/3 flex flex-col items-center'>
                                    <img src={info?.profileUrl || NoProfile}
                                        className='h-40 w-48  object-container 
                                         rounded-md bg-white' alt={info?.profileUrl || NoProfile} />
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