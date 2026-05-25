import appLogo from '../../assets/app.png'

export default function About (){
    return (
        <div className='container mx-auto flex flex-col gap-6 2xl:gap-14 py-6'>
            <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
                <div className='w-full md:2/3 2xl:w-2/4'>
                    <h1 className='text-3xl text-purple-600 font-bold mb-5'>
                        About Job Finder
                    </h1>

                    <p className='text-gray-700 leading-relaxed mb-4'>
                        Job Finder is a comprehensive job recruitment platform designed to connect talented professionals with leading companies. We bridge the gap between job seekers and employers through our innovative, user-friendly platform.
                    </p>

                    <p className='text-gray-700 leading-relaxed mb-4'>
                        Our mission is to revolutionize the recruitment process by making it more efficient, transparent, and successful for both candidates and companies. We believe that the right job can transform lives, and the right talent can transform businesses.
                    </p>

                    <p className='text-gray-700 leading-relaxed mb-4'>
                        With over 50,000 active job seekers and 5,000+ partner companies, Job Finder has become a trusted platform for career advancement and talent acquisition. Our smart matching algorithms and verified company profiles ensure meaningful connections that lead to successful hires.
                    </p>

                    <p className='text-gray-700 leading-relaxed'>
                        Whether you're looking for your dream job or seeking the perfect candidate, Job Finder provides the tools, resources, and support you need to achieve your goals.
                    </p>

                </div>
                <img src={appLogo} alt='Job Finder App' className='w-auto h-[300px] rounded-lg shadow-lg'/>
            </div>

        </div>
    )
}
