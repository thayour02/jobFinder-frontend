import { popularSearch } from "../utils/data"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaSearch } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6";
import CustomButton from './customButton'
import { useContext } from "react"
import { GlobalContext } from "../context"



const SearchInput = ({ placeholder,
    icon, value,
    setValue, styles }) => {

    const handleChange = (e) => {
        setValue(e.target.value)
    };
    const clearInput = () => setValue('');
    return (
        <div className={`flex w-full md:1/3 gap-2 items-center ${styles}`}>
            <div className="flex w-full md:1/3 items-center gap-2">
                {icon}
                <input
                    value={value}
                    onChange={(e)=>handleChange(e)}
                    type='text'
                    className='w-full md:w-64  text-purple-300  outline-none bg-transparent text-base'
                    placeholder={placeholder}
                />
            </div>
            <AiOutlineCloseCircle className=' text-xl cursor-pointer'
                onClick={clearInput} />

        </div>

    )
}

export default function Head({
    handleClick
}) {
    const { cmpLocation,
        setCmpLocation,
        searchQuery,
        setSearchQuery,
        type, } = useContext(GlobalContext)

        const  handlesetValue = (search)=>{
            setSearchQuery(search)
        }
    return (
        <div className="bg-[]">
            <div className={`container mx-auto px-5 ${type ? "h-[500px]"
                : 'h-[350px]'}flex flex-col relative`}>
                <div className="w-full z-10 ">
                    <div className="max-w-screen-2xl container mx-auto md:py-10 py-6 mb-4">
                        <h1 className="text-5xl font-bold text-primary mb-4">
                            Find  Your  <span className="text-purple-600">
                                Dream Job</span> Today </h1>
                    </div>
                    <div className='md:flex gap-2 w-full '>
                        <div className='w-full mb-2 flex  h-10 items-center justify-around bg-white 
                        px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full'>
                            <SearchInput
                                placeholder='JobTitle or Company Name'
                                icon={<FaSearch  size={20} color='purple' />}
                                value={searchQuery}
                                setValue={setSearchQuery}
                            />
                        </div>
                        <div className='w-full mb-2 flex h-10 items-center justify-around
                         bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full'>
                            <SearchInput
                                placeholder='Location'
                                icon={<FaLocationDot size={20} color='purple' />}
                                value={cmpLocation}
                                setValue={setCmpLocation}
                            />
                        </div>
                        <div>
                            <CustomButton
                                onClick={handleClick}
                                title='Search'
                                containerStyles={
                                    "w-40 h-20 text-white md:h-10  text-xl py-2 md:py-3 px-10 md:px-10 focus:outline-none bg-purple-600 rounded-lg md:rounded-md text-sm h-8 md:text-base"
                                }
                            />
                        </div>
                    </div>

                    {type && (
                        <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14">
                            {
                                popularSearch.map((search, index) => (
                                    <button onClick={()=>handlesetValue(search)} key={index}
                                        className="text-black/90 font-semibold bg-purple-200 
                                        py-1 px-2 rounded-full text-sm md-text-base">
                                            {search}</button>
                                ))
                            }
                        </div>
                    )}
                </div>

            </div>
        </div>

    )
}