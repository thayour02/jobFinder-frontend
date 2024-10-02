import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../component/textInput";
import CustomButton from "../../component/customButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { apiRequest } from "../../utils/store";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Login } from '../../redux/slice'
import { GlobalContext } from "../../context";
import { Toaster, toast } from "react-hot-toast"

export default function Reset() {
  // const [isRegister, setIsRegister,] = useState(true)
  const { accountType, setAccountType } = useContext(GlobalContext)
  // const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    // getValues,
    // watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let URL = null;
  if (accountType === "Seeker") {
    URL = "/user/forgot-password"
  } else {
    URL = "/forgotten-password"
  }
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let reset = await apiRequest({
        url: URL,
        method: "POST",
        data: { email: data.email }
      })
      if (reset.status === false) {
        toast.error(reset.message)
        setLoading(false)
      } else {
        toast.success(reset?.message)
        setLoading(false)
      }
      console.log(reset)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-full md:w-full mx-10 px-2  items-center flex justify-center pt-10  h-screen">
      <div className='inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <div className=' h-[350px] w-[300px] max-w-md transform overflow-hidden rounded-2xl 
           bg-white mt-10 p-6 text-left align-middle shadow-xl transition-all'>
            <div className='text-xl font-semibold  '>
              <h1>Forgotten Password?</h1>
            </div>
            <Toaster position="top-left" toastOptions={{ duration: 9000 }} />
            <div>
              <div className='w-full flex items-center justify-center py-4'>
                <button className={`flex-1 px-4 py-2 rounded text-sm outline-none 
                             ${accountType === 'Seeker'
                    ? "bg-purple-200 text-black-500"
                    : "bg-white border border-black"
                  }`} onClick={() => setAccountType('Seeker')}>
                  Seeker
                </button>
                <button className={`flex-1 px-4 py-2
                            rounded text-sm outline-none 
                              ${accountType !== 'Seeker'
                    ? "bg-purple-200 text-black-500"
                    : "bg-white border border-black"
                  }`} onClick={() => setAccountType('Company')}>
                  Company
                </button>
              </div>
              <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  name='email'
                  label='Email Address'
                  placeholder='email@example.com'
                  type='email'
                  register={register("email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />

                <div className='mt-1'>
                  <CustomButton
                    type='submit'
                    containerStyles={`inline-flex justify-center rounded-md bg-purple-600 px-8 py-2
                        text-sm font-medium text-white outline-none hover:bg-blue-800`}
                    disabled={loading}
                    title={
                      loading ? <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : "Submit"
                    }
                  />
                </div>
              </form>
              <h1 className="mt-2">Already have an account?<Link to='/auth' className="underline text-purple-900 space-y-4">Login
              </Link></h1>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
