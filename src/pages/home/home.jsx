import banner from "../../assets/hero-.png"
import Banner from "./banner"
import Features from './features'
import Abouts from './about'
// import Account from './account'
export default function Home() {
    return (
        <div className='md:px-12  max-w-screen-2xl max-auto mt-20 md:pt-10'>
            <Banner heading={"Find Your Dream Job Today"} subheading={`Connect with leading companies and skilled professionals.`} 
                        banner={banner}/>

            <Features />    
            <Abouts />        
            {/* <Account /> */}
        </div>
    )
}
