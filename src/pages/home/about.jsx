import apply from '../../assets/app.png'
import user from '../../assets/seeker.png'
import job from '../../assets/jobs.png'
import { motion } from 'framer-motion'


const Abouts =()=>{
    return (
        // <div className="md:px-14 p-4 mx-20 mx-auto space-y-20">
        //     <div className=' flex flex-col md:flex-row justify-between gap-8 '>
        //         <div className="md:w-1/2"> 
        //         <img src={apply} alt="" className="lg:h-[300px] md:w-80 w-full  rounded-lg hover:-translate-y-4 transition-all duration-300"  />
        //         </div>
        //         <div>
        //             <h2 className='md:text-xl w-full text-3xl font-bold text-purple-400 mb-5 leading-normal'>Meet <span>hundreds of Company</span> Looking for Your Skills</h2>
        //             <p className='text-purple-300 text-lg mb-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        //             <button className="py-2 px-8 bg-purple-300 rounded hover:bg-purple-900">Get Started</button>
        //         </div>
        //     </div>

        //     <div className=' flex flex-col md:flex-row justify-between items-center gap-8 '>
        //         <div>
        //             <h2 className='md:text-xl w-full text-3xl font-bold text-purple-400 mb-5 leading-normal'>Meet <span>hundreds of Company</span> Looking for Your Skills</h2>
        //             <p className='text-purple-300 text-lg mb-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        //             <button className="py-2 px-8 bg-purple-300 rounded hover:bg-purple-900">Get Started</button>
        //         </div>
        //         <div className="md:w-1/2"> 
        //         <img src={apply} alt=""className="lg:h-[300px] md:w-80   rounded-lg hover:-translate-y-4 transition-all duration-300" />
        //         </div>
        //     </div>

        //     <div className=' flex flex-col md:flex-row justify-between  gap-8'>
        //         <div className="md:w-1/2"> 
        //         <img src={apply} alt="" className="lg:h-[300px] md:w-80   rounded-lg hover:-translate-y-4 transition-all duration-300" />
        //         </div>
        //         <div>
        //             <h2 className='md:text-xl w-full text-3xl font-bold text-purple-400 mb-5 leading-normal'>Meet <span>hundreds of Company</span> Looking for Your Skills</h2>
        //             <p className='text-purple-300 text-lg mb-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        //             <button className="py-2 px-8 bg-purple-300 rounded hover:bg-purple-900">Get Started</button>
        //         </div>
        //     </div>
        // </div>   
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <motion.div 
             variants={{
                hidden: { opacity: 0, x: 75 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
            className="lg:w-1/4">
                <h1 className="text-3xl text-purple-900 font-bold lg:w-1/2 mb-3">Are You Looking For A Job?</h1>
                <h1 className="text-base text-purple-200">Register with us and connect with  leading companies with various position available for skilled professionals</h1>
            </motion.div>
            {/* seeker and company */}

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
             className='w-full lg:w-3/4'>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                    <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                        <div>
                            <img src={user} alt="" />
                            <h2 className=' font-semibold text-purple-300 text-xl  mt-5 '>Create A Seeker Account</h2>
                        </div>
                    </div>

                    <div className='bg-purple-300  mt-20  cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                        <div>
                            <img src={job} alt="" className='w-[200px] h-40' />
                            <h5 className=' font-semibold  text-white text-xl px-5 text-center mt-5'>Find Job</h5>
                        </div>
                    </div>

                    <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
                        <div>
                            <img src={apply} alt="" className='h-40 w-[200px]' />
                            <h5 className=' font-semibold text-purple-300 text-xl  mt-5'>Apply For Role</h5>
                        </div>
                    </div>
                   
                </div>


            </motion.div>
        </div>
    </div>
         )
}

export default Abouts