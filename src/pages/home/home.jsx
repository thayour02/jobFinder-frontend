import banner from "../../assets/hero-.png"
import Banner from "./banner"
import Features from './features'
import Abouts from './about'
// import Account from './account'
export default function Home() {
    return (
        <div className='md:px-12  max-w-screen-2xl max-auto mt-20 md:pt-10'>
            <Banner heading={"Find Your Dream Job Today"} subheading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.`} 
                        banner={banner}/>

            <Features />    
            <Abouts />        
            {/* <Account /> */}
        </div>
    )
}
