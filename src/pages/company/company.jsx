import  ListBox  from "../../component/listBox"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context"
import CustomButton from "../../component/customButton"
import { apiRequest, updateUrl } from '../../utils/store'
import { useLocation, useNavigate, } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Head from "../../component/header"
import { Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"




export default function Company() {
    const navigate = useNavigate()
    const location = useLocation()

    const { sort, setSort } = useContext(GlobalContext)
    const { data, setData } = useContext(GlobalContext)
    const { isFetching, setIsFetching } = useContext(GlobalContext)
    const { recordsCount, setRecordCount } = useContext(GlobalContext)
    const { page, setPage } = useContext(GlobalContext)
    const { searchQuery, setSearchQuery,cmpLocation, setCmpLocation} = useContext(GlobalContext)
    const { numPage, setNumPage, } = useContext(GlobalContext)

    const handleShowMore = async()=>{
        setPage((prev)=> prev+1)
    }
    const fetchCompany = async () => {
        setIsFetching(true)
        const newURL = updateUrl({
            pageNum: page,
            query: searchQuery,
            cmpLoc: cmpLocation,
            sort: sort,
            navigate: navigate,
            location: location
        })
        try {
            let companies = await apiRequest({
                url: newURL,
                method: "GET",
            })
            setNumPage(companies?.numPage)
            setRecordCount(companies?.total)
            setData(companies?.data)
            setIsFetching(false)
        } catch (error) {
            return toast(error)
        }
    }
    useEffect(() => {
        fetchCompany()
    },[page,searchQuery,cmpLocation,sort,navigate,location])
    const handleSearchSubmit = async (e)=>{
        e.preventDefault()
      await fetchCompany() 
    }
    return (
        <div className="container -mb-40 bg-purple-100 mx-auto px-4 py-10  md:px-4  pt-20">
            <h2 className="text-3xl font-bold mb-2 pt-10">Companies looking for Professionals</h2>
            <p className="font-semibold mb-4">Dive into our comprehensive collection of companies.</p>
                <div className="mb-10 md:mb-1">
                    <Head  
                    handleClick={handleSearchSubmit}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    cmpLocation={cmpLocation}
                    setCmpLocation={setCmpLocation}
                    />
                </div>
            <div className="flex justify-between items-center px-2 py-2">
                <div className="">
                    <Toaster position="top-center" toastOptions={{duration:5000}}/>
                <p className="text:sm w-full md:text-base  font-medium ">Showing: <span className="font-semibold">
                {recordsCount} </span>Companies Available</p>
                </div>
            <div className="flex items-center justify-between gap-2 md:gap-2 md:items-center">
                <p className="text:sm md:text-base font-medium "> Sort By:</p>
                <ListBox sort={sort} setSort={setSort} />
            </div>
            </div>
            {isFetching ?
                <div className="mt-10 flex justify-center px-40" disabled={isFetching}>
                    <AiOutlineLoading3Quarters size={100} className="align-items-center animate-spin" />
                </div> : <div className="w-full flex flex-col">
                    {data?.map((com, index) => (
                        <div key={index} className='w-full h-16 flex gap-4 items-center justify-between bg-white shadow-md mt-4 rounded'>
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
                            <p className='text-purple-500 font-bold'>{com?.jobPosts?.length}</p>
                            <span className='text-xs md:base font-semibold'>Job Posted</span>
                        </div>
                    </div>
                        ))
                    }
                    <p className="mt-6 font-medium" >
                        {data?.length} records out of {recordsCount}
                    </p>
                </div>
            }

            {
                numPage > page && !isFetching && (
                    <div className="w-full flex items-center justify-center pt-16">
                         <CustomButton
                            title='Load More'
                            onClick={handleShowMore}
                            containerStyles='text-purple-700 py-1.5 px-5 focus:outline-none 
                            hover:bg-purple-700 hover:text-white 
                             hover:border-0 font-bold rounded-full border
                              border-purple-700 '/>
                    </div>
                )}
               
        </div>
    )
}
