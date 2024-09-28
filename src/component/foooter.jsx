import './stlye.css'
import img from '../assets/tayo.webp'
import { Link } from "react-router-dom";
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
        <div className="max-w-screen-2xl  py-10 ">
        <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
               <img src={img} alt="" />
                <p>
                    ACME Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <form>
                <h6 className="footer-title">Newsletter</h6>
                <fieldset className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="username@site.com"
                            className="input input-bordered join-item" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </footer>
        <hr />
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <img src={img} alt="" />
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
               {
                icons.map((item,i)=>(
                    <Link to={item.href} key={i} className={`${item.style}`}>
                        {item.child}
                    </Link>
                ))
               }
            </nav>
        </footer>
    </div>
    )
}

