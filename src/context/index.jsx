import { createContext } from "react";
import { useState} from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [cmpLocation, setCmpLocation] = useState('')
  const [title, setTitle] = useState('Find Your Dream Job')
  const [type, setType] = useState('home')
  const [sort, setSort] = useState('Newest')
  const [job, setJob] = useState('')
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [recordsCount, setRecordCount] = useState(0)
  const [page, setPage] = useState(1)
  const [numPage, setNumPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(null)
  const [openForm, setOpenForm] = useState(false)
  const [open, setOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState('Seeker')
  const [ProfileImg, setProfileImg] = useState('')
  const [uploadCv, setUploadCv] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [jobTitle, setJobTitle] = useState('Full-Time')
  const [jobTypes, setjobTypes] = useState('Full-Time')
  const [recentPost, setRecentPost]=useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [similarJob, setSimilarJob] = useState([])
 
  async function handleClick() {

  }
  async function handleShowMore() {

  }
  async function closeModal() {
    setOpen(true)
  }
  
  async function handleCloseBar() {
    setIsOpen((prev) => !prev);
  }
  

  return <GlobalContext.Provider
    value={{
      loading, setLoading,
      info, setInfo, openForm, setOpenForm,
      searchQuery, setSearchQuery, handleClick,
      type, title, errorMsg, setErrorMsg, setTitle, setType, 
      sort, setSort, job, setJob,
      data, setData, isFetching, setIsFetching, recordsCount,
      setRecordCount, page, setPage, numPage, setNumPage, handleShowMore,
      open, setOpen, isRegister, setIsRegister, accountType,
      setAccountType,  ProfileImg, setProfileImg,
      uploadCv, setUploadCv, jobTitle, setJobTitle,  closeModal, isOpen,
       setIsOpen, handleCloseBar,jobTypes, setjobTypes,recentPost, setRecentPost,
       cmpLocation, setCmpLocation,similarJob, setSimilarJob
    }}>
    {children}</GlobalContext.Provider>
}
