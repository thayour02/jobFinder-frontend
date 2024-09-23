import { useState } from 'react';



const types = ["Full-Time", "Part-Time", "Contract", "Intern"]

export const JobTypes = ()=> {
    const [jobType,setJobType] = useState('Full-time')
    return (
        <div className='w-[10rem] md:w-[10rem] '>
            <select value={jobType} onChange={(e)=>setJobType(e.target.value)}
                className="form-control  relative w-full cursor-default rounded-lg 
          bg-white py-2 pl-3 pr-10 text-left border-2 border-gray-200 focus:outline-none
         focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
          focus-visible:ring-offset-orange-300 sm:text-sm" >
                {types.map(opt => (
                    <option key={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}
