import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../component/textInput";
import CustomButton from "../../component/customButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { apiRequest } from "../../utils/store";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from '../../redux/slice'
import { GlobalContext } from "../../context";
import  { Toaster,toast } from "react-hot-toast"
// import EmailVerify from './emailVerify'

const SignUp = () => {
    const [isRegister, setIsRegister,] = useState(true)
    const { accountType, setAccountType } = useContext(GlobalContext)
    const [errorMsg] = useState('')
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()
    const location = useLocation()

     location.state?.from?.pathname || '/find-jobs'

    const {
        register,
        handleSubmit,
        getValues,
        // watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    let URL = null;
    if (isRegister) {
        if (accountType === "Seeker") {
            URL = "/user/signup"
        } else {
            URL = "/reg"
        }
    } else {
        if (accountType === "Seeker") {
            URL = "/user/login"
        } else {
            URL = "/login"
        }
    }
    async function onSubmit(data) {
        setLoading(true)
        try {
            let res = await apiRequest({
                data: data,
                method: "POST",
                url: URL,
            })
            if (res?.status === false) {
                toast.error(res?.message)
                setLoading(false)
            } else{
                if(isRegister){
                const data = { token: res?.token, ...res?.user };
                dispatch(Login(data));
                localStorage.setItem("userInfo", JSON.stringify(data))
                window.location.replace("/verify-email")
                toast.success(res?.message)
                setTimeout(()=>{
                    window.location.replace('/find-jobs')
                },1500)
                }else{
                const data = { token: res?.token, ...res?.user };
                dispatch(Login(data));
                localStorage.setItem("userInfo", JSON.stringify(data))
                window.location.replace("/find-jobs")
                toast.success(res?.message)
                }
            }
        } catch (error) {
             return error
        }
    };
    return (
        <div className="min-h-full  md:w-full mx-10 px-2 max-w-md w-5/6 items-center flex justify-center pt-10">
            <div className='inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <div className='w-full max-w-md transform overflow-hidden rounded-2xl 
                   bg-white mt-10 p-6 text-left align-middle shadow-xl transition-all'>
                        <div className='text-xl font-semibold px-4 '>
                            {isRegister ? "Create Account" : "Account Sign In"}
                        </div>
                        <Toaster position="top-left" toastOptions={{duration: 9000}}/>
                        <div>
                            {errorMsg && (
                                <span
                                    role='alert'
                                    className='text-sm text-red-500 mt-0.5'
                                >
                                    {errorMsg}
                                </span>)}
                        </div>
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
                        <form
                            className='w-full flex flex-col gap-5'
                            onSubmit={handleSubmit(onSubmit)}
                        >
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

                            {isRegister && (
                                <div className='w-full flex gap-1 md:gap-2'>
                                    <div
                                        className={`${accountType === "Seeker" ? "w-1/2" : "w-full"
                                            }`}
                                    >
                                        <TextInput
                                            name={
                                                accountType === "Seeker" ? "firstName" : "name"
                                            }
                                            label={
                                                accountType === "Seeker"
                                                    ? "First Name"
                                                    : "Company Name"
                                            }
                                            placeholder={
                                                accountType === "Seeker"
                                                    ? "eg. James"
                                                    : "Comapy name"
                                            }
                                            type='text'
                                            register={register(
                                                accountType === "Seeker" ? "firstName" : "name",
                                                {
                                                    required:
                                                        accountType === "Seeker"
                                                            ? "First Name is required"
                                                            : "Company Name is required",
                                                }
                                            )}
                                            error={
                                                accountType === "Seeker"
                                                    ? errors.firstName
                                                        ? errors.firstName?.message
                                                        : ""
                                                    : errors.name
                                                        ? errors.name?.message
                                                        : ""
                                            }
                                        />
                                    </div>

                                    {accountType === "Seeker" && isRegister && (
                                        <div className='w-1/2'>
                                            <TextInput
                                                name='LastName'
                                                label='Last Name'
                                                placeholder='Wagonner'
                                                type='text'
                                                register={register("LastName", {
                                                    required: "Last Name is required",
                                                })}
                                                error={
                                                    errors.LastName ? errors.LastName?.message : ""
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='w-full flex gap-1 md:gap-2'>
                                <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                                    <TextInput
                                        name='password'
                                        label='Password'
                                        placeholder='Password'
                                        type='password'
                                        register={register("password", {
                                            required: "Password is required!",
                                        })}
                                        error={
                                            errors.password ? errors.password?.message : ""
                                        }
                                    />
                                </div>

                                {isRegister && (
                                    <div className='w-1/2'>
                                        <TextInput
                                            label='Confirm Password'
                                            placeholder='Password'
                                            type='password'
                                            register={register("cPassword", {
                                                validate: (value) => {
                                                    const { password } = getValues();
                                                    if (password != value) {
                                                        return "Passwords do no match";
                                                    }
                                                },
                                            })}
                                            error={
                                                errors.cPassword &&
                                                    errors.cPassword.type === "validate"
                                                    ? errors.cPassword?.message
                                                    : ""
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='mt-2'>
                                <CustomButton
                                    type='submit'
                                    containerStyles={`inline-flex justify-center rounded-md bg-purple-600 px-8 py-2
                                         text-sm font-medium text-white outline-none hover:bg-blue-800`}
                                    disabled={loading}
                                    title={
                                        loading ? <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : ` ${isRegister ? "Create Your Account" : "Sign In"}`
                                    }
                                />
                            </div>
                        </form>
                        <div className='mt-4'>
                            <p className='text-sm text-gray-700'>
                                {isRegister
                                    ? "Already has an account?"
                                    : "Do not have an account"}
                                <span
                                    className='text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer'
                                    onClick={() => setIsRegister((prev) => !prev)}
                                >
                                    {isRegister ? "Login" : "Create Account"}
                                </span>
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm text-gray-700'>
                                {isRegister
                                    ? ""
                                    : "forgotten password?"}
                                <Link to='/reset-password' className="font-bold underline text-purple-200">
                                    {isRegister ? "" : "click here"}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
                                    
        </div>
    )
};

export default SignUp;