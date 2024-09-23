import  react  from '../../assets/react.svg'

export default function About (){
    return (
        <div className='conatiner mx-auto flex flex-col gap-6 2xl:gap-14 py-6'>
            <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
                <div className='w-full md:2/3 2xl:w-2/4'>
                    <h1 className='text-3xl text-purple-600 font-bold mb-5'>
                        About Us
                    </h1>

                    <p></p>

                    SQI College of ICT is filled with people who are creative, passionate, experienced and have this itching love of community building, technology, learning, and the desire to better themselves.

                    SQI College of ICT is a Registered Training Institution, delivering nationally accredited training and hands-on education in the area of the Software Architecture, Robotics Engineering, and 3D Animation & VFX.

                    Over the past 14 years, SQI ICT Academy has built a reputation as one of the premier hands-on, intensive ICT training schools in the world before being instituted as a college of ICT.

                </div>
                <img src={react} alt={'react'}className='w-auto h-[300px]'/>
            </div>

        </div>
    )
}
