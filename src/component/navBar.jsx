
import { Fragment, useContext } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineLogout } from 'react-icons/ai'
import { CgProfile } from "react-icons/cg"
import img from '../assets/tayo.webp'
import { Link } from 'react-router-dom';
import { Menu, Transition } from "@headlessui/react"
import CustomButton from './customButton';
import './stlye.css'
// import NoProfile from '../assets/images.jpeg'
import { GlobalContext } from '../context/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LogOut } from '../redux/slice';
import { FcApproval } from "react-icons/fc";
import { MdOutlineVerified } from "react-icons/md";

function MenuList() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    function handleLogOut() {
        dispatch(LogOut())
        window.location.replace('/')
    }
    return (
        <div>
            <Menu as='div'>
                <div className="flex items-center gap-8">
                    <Menu.Button className='inline-flex gap-2 w-full rounded-md md:px-4
                         py-2 text-sm font-medium text-white border-0 bg-purple-900 b hover:bg-white hover:text-purple-700'>
                        {user?.accountType === "Seeker" ?
                            <div className="leading[80px] flex flex-col items-start px-2">
                                <div className='flex items-center'>
                                    <p className="text-sm font-semibold">{user?.firstName ?? user?.lastname}</p>
                                    <div>
                                        {user.isVerified === true
                                            ? <FcApproval  />
                                            : <MdOutlineVerified  />
                                        }
                                    </div>
                                </div>
                                <span>{user?.jobTitle ?? user?.email}</span>
                            </div>
                            : <div className="leading[80px] flex flex-col items-start">
                                <div className='flex items-center space-x-1'>
                                <p className="text-sm font-semibold">{user?.name}</p>
                                <div>
                                        {user.isVerified === true
                                            ? <FcApproval />
                                            : <MdOutlineVerified />
                                        }
                                    </div>
                                </div>
                                <span>{user?.email}</span>
                            </div>}

                        <div className='flex gap-6'>
                            <img src={user?.profileUrl}
                                className='h-10 w-10 rounded-md ' alt={user?.profileUrl} />
                            <BiChevronDown className='h-8 w-8' />
                        </div>
                    </Menu.Button>
                </div>
                <Transition as={Fragment}
                    enter='trasition east-out duration-200'
                    enterFrom='transform opacity-0 scale-100'
                    enterTo='trasnform opacity-100 scale-100'
                    leave='trasition east-in duration-100'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-90'>
                    <Menu.Items className='absolute z-50 right-z mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none'>
                        <div className='p-1'>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to={`${user?.accountType ? "/user-profile" : "/company-profile"
                                        }`} className={`${active ? "bg-purple-700 text-white" :
                                            "text-gray-700"} group w-full 
                                            items-center rounded-md p-2 text-sm flex`}
                                    >
                                        <CgProfile
                                            className={`${active ? "text-white" :
                                                "text-gray-700"} mr-2 h-5 w-5`} aria-hidden='true' />
                                        {user?.accountType ? "user profile" : "company profile"}
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link onClick={() => handleLogOut()}
                                        className={`${active ? "bg-purple-700 text-white" :
                                            "text-gray-700"} group w-full 
                                            items-center rounded-md p-2 text-sm flex`}
                                    >
                                        <AiOutlineLogout
                                            className={`${active ? "text-white" :
                                                "text-gray-700"} mr-2 h-5 w-5`} aria-hidden='true' />
                                        Log Out
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
export default function Navbar() {
    const { user } = useSelector((state) => state.user);

    const { isOpen, setIsOpen, handleCloseBar } = useContext(GlobalContext)
    const links = [
        {
            id: 4,
            link: "/find-jobs",
            name: 'Jobs'
        },
        {
            id: 3,
            name: "Company",
            link: "/company"
        },
        {
            id: 1,
            name: "About",
            link: '/about-us'
        },

    ]

    return (
        <>
            <div className='fixed top-0 left-0 z-10 text-purple-900  w-full  bg-gradient-to-r from-purple-900 to-purple-200' >
                <nav className='container h-20 mx-auto flex items-center justify-between  p-5'>
                    <div>
                        <Link to='/' className='text-xl font-bold text-purple-700 flex
                        items-center'>
                            <img className='img' src={img} alt="" />
                            <p>Job <span className='text-white'>Portal</span></p>
                        </Link>
                    </div>
                    <ul className='hidden lg:flex items-center mx-auto gap-10 text-base'>
                        {links.map(({ id, link, name }) => (
                            <li key={id}>
                                <Link to={link}>
                                    <span className='font-bold '>{name}</span>
                                </Link>
                            </li>
                        ))}
                        <Link className=' font-bold  ' onClick={handleCloseBar} to={
                            user?.accountType === 'Seeker' ? '/find-users' : "/upload-job"
                        }>
                            {user?.accountType === "Seeker" ? "Seeker" : "Post Job"}
                        </Link>
                    </ul>

                    <div className='hidden lg:block'>
                        {!user?.token ? (
                            <Link to='/auth'>
                                <CustomButton
                                    title='Sign In'
                                    containerStyles='text-purple-700 py-1.5 px-5 focus:outline-none 
                                    hover:bg-purple-700 hover:text-white 
                                    hover:border-0 font-bold rounded-full border border-purple-700'/>
                            </Link>
                        ) : <div>
                            <MenuList user={user} onClick={handleCloseBar} />
                        </div>

                        }
                    </div>
                    <div >
                        <button className='lg:hidden block' onClick={() => setIsOpen((prev) => !prev)}>
                            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                        </button>
                    </div>
                </nav>
                {/* {MOBILE NAVIGATION} */}
                <div className={`${isOpen ? ' flex bg-[#f7fdfd]' : 'hidden'
                    } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}>
                    <Link className=' font-semibold text-xl' to='/find-jobs' onClick={handleCloseBar}>
                        Find Job
                    </Link>
                    <Link className=' font-semibold text-xl' to='/company' onClick={handleCloseBar}>
                        Company
                    </Link>
                    <Link className=' font-semibold text-xl' onClick={handleCloseBar} to={
                        user?.accountType === 'Seeker' ? '/find-users' : "/upload-job"
                    }>
                        {user?.accountType === "Seeker" ? "Seekers" : "Post Job"}
                    </Link>
                    <Link className=' font-semibold text-xl' to='/about-us' onClick={handleCloseBar}>
                        About
                    </Link>
                    <div className='w-full '>
                        {
                            !user?.token ? (
                                <Link to='/auth' onClick={handleCloseBar}>
                                    <CustomButton
                                        title='Sign In'
                                        containerStyles='text-purple-700 py-1.5 px-5 focus:outline-none 
                                    hover:bg-purple-700  hover:text-white 
                                    hover:border-0 font-bold rounded-full border border-purple-700'/>
                                </Link>
                            ) : <div className='px-2'>
                                <MenuList user={user} onClick={handleCloseBar} />
                            </div>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}