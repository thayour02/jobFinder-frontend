const options = ["Newest", "Oldest", "A-Z", "Z-A"];

export default function ListBox({ sort, setSort }) {

    return (
        <div className='w-[10rem] md:w-[10rem] ' >
            <select value={sort} onChange={(e)=>setSort(e.target.value)} 
             className="form-control  relative w-full cursor-default rounded-lg 
            bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
            focus-visible:ring-offset-orange-300 sm:text-sm" name="" id="">
                   {options.map(option =>(
                    <option key={option} >
                        {option}
                    </option>
                   ))}
            </select>
        </div>
    );
};
