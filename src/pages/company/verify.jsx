import { useContext, useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { apiRequest } from '../../utils/store'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch,} from 'react-redux'
import { Login } from '../../redux/slice'
import { toast, Toaster } from 'react-hot-toast'
import { GlobalContext } from '../../context'
import { MdVerified } from "react-icons/md";

const VerifyCompanyEmail = () => {
  const [message, setMessage] = useState('');
  const [ verified, setVerified] = useState(false);
  const { accountType } = useContext(GlobalContext)
  const {  setLoading } = useContext(GlobalContext)
  const [isRegister] = useState(true)

  const dispatch = useDispatch
  const navigate = useNavigate()
  const { token, id } = useParams()


  

  useEffect(() => {
    const verifyEmail = async (data) => {  
      setLoading(true)
      try {
        let response = await apiRequest({
          url: `/verify-user/${id}/${token}`,
          method: "GET",
        })
        console.log(response)
        if (response.success === true) {
          setVerified(response.account.isVerified);;
          setMessage(response.message);
          toast.success(response.message);
          setLoading(false)
          // Set timeout to dispatch to home page
          setTimeout(() => {
            window.location.replace('/find-jobs')
            dispatch(Login(data))
          }, 1500); // 1500ms = 1.5s
        }
      } catch (error) {
        setMessage(error);
        setLoading(false)
      }
    };
    verifyEmail();
  }, [token, id, accountType, dispatch, navigate,setLoading,isRegister]);

  return (
    <div className='pt-20 bg-purple-200 h-screen'>
      <Toaster position='top-left' toastOptions={{duration:3000}} />
      {verified ? (
       <div className='max-w-screen-2xl xl:px-20 px-4  items-center bg-purple-200'>
         <MdVerified className='w-full' />
         <h1>{message}</h1>
       </div>
      ) : (
        <AiOutlineLoading3Quarters size={100} className="mt-10 flex justify-center px-40 align-items-center animate-spin" />
      )}
    </div>

  )

};

export default VerifyCompanyEmail;
