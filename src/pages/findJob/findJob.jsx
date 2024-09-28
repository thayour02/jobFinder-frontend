import { useState, useContext, useEffect,useCallback} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Head from "../../component/header";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { experience, jobTypes } from "../../utils/data";
import ListBox from "../../component/listBox";
import JobCard from "../../component/jobCard";
import { GlobalContext } from "../../context";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { apiRequest, updateUrl } from "../../utils/store";
import CustomButton from "../../component/customButton";

export default function FindJob() {
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [filterJobTypes, setFilterJobTypes] = useState([])
  const [filterExp, setFilterExp] = useState([])
  const [isfetching, setIsFetching] = useState(false)
  const { searchQuery, setSearchQuery,cmpLocation, setCmpLocation } = useContext(GlobalContext)
  const [expVal, setExpVal] = useState([])

  const navigate = useNavigate()
  const location = useLocation()


  // fetchJob
  const fetchJob = useCallback(async () => {
    setIsFetching(true);
    const newURL = updateUrl({
        pageNum: page,
        query: searchQuery,
        cmpLoc: cmpLocation,
        sort: sort,
        jType: filterJobTypes,
        exp: filterExp,
        navigate: navigate,
        location: location,
    });
    try {
        const res = await apiRequest({
            url: "/jobs" + newURL,
            method: "GET"
        });
        setNumPage(res?.numPage);
        setRecordCount(res?.total);
        setData(res?.data);
        setIsFetching(false);
    } catch (error) {
        setIsFetching(false);
        return error;
    }
}, [page, searchQuery, cmpLocation, sort, filterJobTypes, filterExp, navigate, location]);

useEffect(()=>{
  fetchJob()
},[fetchJob])
  //FILTERJOBTYPES
  const filterJob = async (e) => {
    if (filterJobTypes?.includes(e)) {
      setFilterJobTypes(filterJobTypes?.filter((el) => el != e));
    } else {
      setFilterJobTypes([...filterJobTypes, e]);
    }

  }
  //FILTERJOBTYPES by experince
  const filterExperience = async (e) => {
    if (expVal?.includes(e)) {
      setExpVal(expVal?.filter((el) => el != e))
    } else {
      setExpVal([...expVal, e])
    }
  }
  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = [];

      expVal?.map((el) => {
        const newEl = el?.split('-');
        newExpVal.push(Number(newEl[0]), Number(newEl[1]))
      })
      newExpVal?.sort((a, b) => a - b);

      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal.length - 1]}`)
    }
  }, [expVal])

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    await fetchJob()
  }

  const handleShowMore = async (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1)
  }
  return (
    <div className="pt-20 overflow-y-auto">
      <Head
        type='home'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={ setCmpLocation}
        className=""
      />
      <div className="relative container mx-auto flex gap-6 
         2xl:gap-10  md:px-5 py-0 md:py-6 bg-[#f7fdfd] mt-10">
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadoww-sm">
          <p className="text-lg font-semibold text-slate-600">Filter Search</p>
          {/* //FILTERBYJOBTYPES */}
          <div className="py-2">
            <div className="flex mb-3 justify-between">
              <p className="flex  items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type</p>
              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {jobTypes.map((id) => (
                <div key={id.title} className="flex items-center gap-2 text-sm
               md:text-base">
                  <input type="checkbox"
                    value={id.title}
                    className="w-4 h-4"
                    onChange={(e) => filterJob(e.target.value)} />
                  <span>{id.title}</span>
                </div>
              ))}
            </div>
          </div>
          {/* //FILTERBYJOBTYPES */}


          {/* FILTERBYEXPERIENCES */}
          <div name='experience' className="py-2 mt-4">
            <div className="flex mb-3 justify-between">
              <p className="flex  items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Experience</p>
              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {experience.map((id) => (
                <div key={id.title} className="flex  items-center  gap-2 text-sm
                   md:text-base">
                  <input type="checkbox"
                    value={id?.value}
                    className="w-4 h-4"
                    onChange={(e) => filterExperience(e.target.value)} />
                  <span>{id.title}</span>
                </div>
              ))}
            </div>

          </div>
          {/* FILTERBYEXPERIENCES */}

        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex  items-center justify-between mb-4">
            <p className="text:sm md:text-base">Showing: <span className="font-semibold">{recordCount}</span>Jobs Available</p>

            <div className="flex flex-col gap-0 md:gap-2 md:items-center">
              <p className="text:sm md:text-base">Sort By:</p>
              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>
           <div className="w-full md:flex flex-wrap gap-4">
              {
                data?.map((job, index) => {
                  const newJob = {
                    name: job?.company?.name,
                    logo: job?.company?.profileUrl,
                    ...job,
                  }
                  return <JobCard job={newJob} key={index} />
                })
              }
            </div>  
            {isfetching &&(
                 <div className="mt-10 flex justify-center px-40" disabled={isfetching}>
                 <AiOutlineLoading3Quarters size={100} className="align-items-center animate-spin" />
               </div>  
            )}
             {numPage > page && !isfetching && (
                  <div className="w-full flex items-center justify-center pt-16">
                    <CustomButton
                      title='Load More'
                      onClick={handleShowMore}
                      containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-purple-700 
                      hover:text-white rounded-full text-base border border-purple-600`} />
                  </div>
                )}
        </div>
      </div>
    </div>
  )
}
