import { motion } from 'framer-motion'

export default function Banner({ banner, heading, subheading }) {
    return (
        <div className=" bg-gradient-to-r from-black to-purple-300 md:rounded-xl 
        md:rounded-br-[80px] md:p-9 px-4 py-9 ">
            <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                {/* banner?\ */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: -75 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                    className="md:w-3/5 text-white">
                    <h1 className="md:text-6xl text-5xl font-bold  mb-6 leading-relaxed">{heading}</h1>
                    <p className=" text-[#f7fdfd] mb-8">{subheading}
                    </p>
                    <div className="space-x-5">
                        {/* <button className="py-2 px-8 bg-purple-300 rounded hover:bg-purple-900">{btn1}</button>
                     <button className="py-2 px-8 bg-purple-300 rounded hover:bg-purple-900">{btn2}</button> */}
                    </div>
                </motion.div>
                {/* banner image */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: -75 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                >
                    <img src={banner} alt="" className="lg:h-[300px] md:w-80   rounded-lg" />

                </motion.div>
            </div>
        </div>
    )
}