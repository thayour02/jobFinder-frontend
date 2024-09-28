import hire from '../../assets/comp.png'
import post from '../../assets/post.png'
import app from '../../assets/applicant.png'



// const Features = () => {
//     return (
//         <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
//             <div className="flex flex-col md:flex-row justify-between items-start gap-10">
//                 <div className="lg:w-1/4">
//                     <h1 className="text-3xl text-purple-900 font-bold lg:w-1/2 mb-3">Are You Looking For A Proffessional To Hire?</h1>
//                     <h1 className="text-base text-purple-200">Connect with skilled professionals  registered with us</h1>
//                 </div>
//                 {/* seeker and company */}

//                 <div className='w-full lg:w-3/4'>
//                     <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
//                         <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
//                             <div>
//                                 <img src={hire} alt="" />
//                                 <h2 className=' font-semibold text-purple-300 text-xl  mt-5 '>Create A Company Account</h2>
//                             </div>
//                         </div>

//                         <div className='bg-purple-300  mt-20  cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
//                             <div>
//                                 <img src={post} alt="" className='w-[200px] h-40' />
//                                 <h5 className=' font-semibold  text-white text-xl px-5 text-center mt-5'>Post A Job</h5>
//                             </div>
//                         </div>

//                         <div className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'>
//                             <div>
//                                 <img src={app} alt="" className='h-40 w-[200px]' />
//                                 <h5 className=' font-semibold text-purple-300 text-xl  mt-5'>Choose An Applicant </h5>
//                             </div>
//                         </div>
                       
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }


// export default Features


import { useEffect } from 'react';
import { motion, useAnimation , useInView} from 'framer-motion';
// import {  } from 'react-intersection-observer';


const Features = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const variants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                <div className="lg:w-1/4">
                    <h1 className="text-3xl text-purple-900 font-bold lg:w-1/2 mb-3">Are You Looking For A Professional To Hire?</h1>
                    <h1 className="text-base text-purple-200">Connect with skilled professionals registered with us</h1>
                </div>
                <div className='w-full lg:w-3/4'>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={controls}
                            variants={variants}
                            className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'
                        >
                            <div>
                                <img src={hire} alt="" />
                                <h2 className='font-semibold text-purple-300 text-xl mt-5'>Create A Company Account</h2>
                            </div>
                        </motion.div>

                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={controls}
                            variants={{ ...variants, hidden: { opacity: 0, x: 100 } }}
                            className='bg-purple-300 mt-20 cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'
                        >
                            <div>
                                <img src={post} alt="" className='w-[200px] h-40' />
                                <h5 className='font-semibold text-white text-xl px-5 text-center mt-5'>Post A Job</h5>
                            </div>
                        </motion.div>

                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={controls}
                            variants={variants}
                            className='bg-[#f7fdfd] cursor-pointer rounded-[35px] shadow-lg p-8 items-center flex justify-center hover:-translate-y-4 transition duration-300'
                        >
                            <div>
                                <img src={app} alt="" className='h-40 w-[200px]' />
                                <h5 className='font-semibold text-purple-300 text-xl mt-5'>Choose An Applicant</h5>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
