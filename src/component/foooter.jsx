import './stlye.css'
import img from '../assets/tayo.webp'
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'



export default function Foooter() {
    const icons = [
        {
            id: 1,
            child: (
                <FaInstagram size={40} />

            ),
            href: "/",
            style: 'text-white'
        },
        {
            id: 2,
            child: (
                <FaGithub size={40} />
            ),
            href: "/",
            style: 'text-white'

        },
        {
            id: 3,
            child: (
                <FaLinkedin size={40} />
            ),
            href: "/",
            style: 'text-white'

        },
        {
            id: 4,
            child: (
                <FaFacebook size={40} />
            ),
            href: "/",
            style: 'text-white'

        }
    ]
    return (
        <div className="mt-40 text-white bg-gradient-to-r from-purple-900 to-purple-200 w-full p-4 max-w-screen-2xl mx-auto">
            <div className=' flex flex-col md:flex-row '>
                <div className=''>
                    <div className='md:w-1/2 space-y-8'>
                        <Link to='/' className='text-xl font-bold text-purple-700 flex
                        items-center'>
                            <img className='img' src={img} alt="" />
                            <p>Job <span className='text-white'>Portal</span></p>
                        </Link>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className='space-y-8 mb-10'>
                        <input className='bg-purple-700 py-2 px-4 rounded-md focus:outline-none'
                            type='email' id='email' placeholder='Your Email' />
                        <input type='submit'
                            value="Subscribe"
                            className='bg-purple-300 py-2 px-4 rounded-md focus:outline-none -ml-2 cursor-pointer hover:bg-purple-900 ' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="md:w-1/2 flex flex-col md:flex-row gap-10 justify-between items-start  px-4">
                        {footerLinks.map(({ id, title, links }) => (
                            <div className="mx-auto px-4" key={id}>
                                <h2 className="font-medium  text-white tracking-widest mb-3">
                                    {title}
                                </h2>
                                <div className="mb-8 flex flex-col gap-3">
                                    {links.map((link, indexedDB) => (
                                        <Link key={(link, indexedDB)} className="text-black font-bold" to='/'>{link}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container px-5 items-end mx-auto">
                <div className="flex items-center justify-center gap-4">
                    {
                        icons.map(({ id, child, href, style }) => (
                            <a href={href} key={id} className={`${style}`}>
                                {child}
                            </a>
                        ))
                    }
                </div>
            </div>
       
        </div>
    )
}

