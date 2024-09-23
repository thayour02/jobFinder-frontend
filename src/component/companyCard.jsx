import { Link } from 'react-router-dom'

export const CompanyCard = ({ com }) => {
  return (
    <div className='w-full h-16 flex gap-4 items-center justify-between bg-white shadow-md mt-4 rounded'>
        <div className='w-3/4 md:w-2/4 px-4 flex gap-4 items-center'>
            <Link to={`/company-profile/${com?._id}`}>
                <img src={com?.profileUrl}  alt={com?.name} 
                className='w-8 md:w-13 h-8 md:h-13 rounded truncate'/>
            </Link>
            <div className='h-full flex flex-col'>
                <Link to={`/company-profile/${com?._id}`}
                className='text-base md:text-lg font-semibold text-black truncate'>
                    {com?.name}
                </Link>
                    <span className='text-base text-purple-500'>{com?.email}</span>
            </div>
        </div>
        
        <div className='hidden md:flex w-1/4 h-full items-center'>
            <p className='text-base text-start'>{com?.location}</p>
        </div>
        <div className='w-1/4 h-full flex flex-col items-center mt-6'>
            <p className='text-purple-500 font-bold'>{com?.jobPosts.length}</p>
            <span className='text-xs md:base font-semibold'>Job Posted</span>
        </div>
    </div>
  )
}
