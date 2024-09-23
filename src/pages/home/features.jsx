import hire from '../../assets/comp.png'
import post from '../../assets/post.png'
import app from '../../assets/applicant.png'



const Features = () => {
    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                <div className="lg:w-1/4">
                    <h1 className="text-3xl text-purple-900 font-bold lg:w-1/2 mb-3">Are You Looking For A Proffessional To Hire?</h1>
                    <h1 className="text-base text-purple-200">Find A Worker to fill a role in your company</h1>
                </div>
                {/* seeker and company */}

                <div className='w-full lg:w-3/4'>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                            <div>
                                <img src={hire} alt="" />
                                <h2 className=' font-semibold text-purple-300 text-xl  mt-5 '>Create A Company Account</h2>
                            </div>
                        </div>

                        <div className='bg-purple-300  mt-20  cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                            <div>
                                <img src={post} alt="" className='w-[200px] h-40' />
                                <h5 className=' font-semibold  text-white text-xl px-5 text-center mt-5'>Post A Job</h5>
                            </div>
                        </div>

                        <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                            <div>
                                <img src={app} alt="" className='h-40 w-[200px]' />
                                <h5 className=' font-semibold text-purple-300 text-xl  mt-5'>Choose An Applicant </h5>
                            </div>
                        </div>
                       
                    </div>


                </div>
            </div>
        </div>
    )
}


export default Features