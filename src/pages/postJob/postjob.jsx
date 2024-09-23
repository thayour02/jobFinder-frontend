import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlobalContext } from '../../context';
import TextInput from '../../component/textInput';
import CustomButton from '../../component/customButton';
import JobCard from '../../component/jobCard'
import { useSelector } from 'react-redux';
import { apiRequest } from '../../utils/store';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import {toast,Toaster} from "react-hot-toast"



const types = ["Full-Time", "Part-Time", "Contract", "Intern"]

export default function PostJob() {

  const { user } = useSelector((state) => state.user)

  const { register, handleSubmit,formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {}
  });

  // const { jobTitle, setJobTitle } = useContext(GlobalContext)
  // const { errorMsg, setErrorMsg } = useContext(GlobalContext)
  const { loading, setLoading } = useContext(GlobalContext)
  const { recentPost, setRecentPost } = useContext(GlobalContext)
  const [jobType, setJobType] = useState('Full-Time')


  //POST-JOB
  const onSubmit = async (data) => {
    const newData = { ...data, jobType: jobType }
    try {
      const post = await apiRequest({
        url: '/jobs/postjob',
        method: "POST",
        data: newData,
        token: user?.token
      })
      if (post.status === 'failed'){
        toast.error({...post})
        setLoading(false)
      }else{
        toast.success("Job Posted Successfully")
        setLoading(false)
        setTimeout(()=>{
          window.location.reload();
        },1500)
      }
    } catch (error) {
      return error
    }
  }

  const recentJob = async () => {
    const id = user?._id
    try {
      let recent = await apiRequest({
        url: "/get-company/" + id,
        method: "GET"
      })
      setRecentPost(recent?.data?.jobPosts)
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    recentJob()
  })

  return (
    <div className='conatiner  w-full  flex flex-col md:flex-row
     gap-10 2xl:gap-14 bg-[#f7fdfd] pt-20 '>
      <Toaster position='top-left' toastOptions={{duration:4000}} />
      <div className='w-full   h-fit md:w-2/4 xl:2/4 bg-white px-5 py-10
         md:px-10 md:mx-20 shadow-md'>
        <div className='mx-auto'>
          <p className='text-2xl font-semibold'>Post Job</p>
          <form action='submit' className='w-full  flex flex-col '
            onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
              <TextInput
                name='jobTitle'
                label='Job Title'
                placeholder='eg Software Engineer'
                type='text'
                required={true}
                register={register('jobTitle', {
                  required: 'Job Title Is Required'
                })}
                error={errors.jobTitle ? errors.jobTitle?.message : ""} />
            </div>

            <div className='w-full flex gap-2'>
              <div className={`w-1/2 mt-2`}>
                <label className='text-gray-600 text-sm mb-1'>Job Type</label>
                <div className='w-[10rem] md:w-[10rem] '>
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)}
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
              </div>
              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label="Salary (USD)"
                  placeholder='eg 4500'
                  type='number'
                  required={true}
                  register={register('salary', {
                    required: 'Salary Is Required'
                  })}
                  error={errors.Salary ? errors.Salary?.message : ""} />
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='w-1/2'>
                <TextInput
                  name='vacancy'
                  label="No. Of Vacancies"
                  placeholder='Vacancy'
                  type='number'
                  register={register('vacancy', {
                    required: 'No. of Vacancy Is Required'
                  })}
                  error={errors.Vacancy ? errors.Vacancy?.message : ""} />
              </div>
              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label="Years of Experience"
                  placeholder='Experience'
                  type='number'
                  register={register('experience', {
                    required: 'Year of Experience Is Required'
                  })}
                  error={errors.experience ? errors.experience?.message : ""} />
              </div>
            </div>
            <div className=''>
              <TextInput
                name='location'
                label='Job Location'
                placeholder='eg Lagos'
                type='text'
                register={register('location', {
                  required: 'Job Location Is Required'
                })}
                error={errors.location ? errors.location?.message : ""} />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600'>Job Requirement</label>
              <textarea name='detail[0]requirement' className='rounded border border-gray-400
                     focus:outline-none focus:border-blue-500 focus:ring-1
                      text-base px-4 py-2 resize-none'
                rows={2} cols={4} {...register("requirement", {
                  required: "write about job requirement"
                })} aria-invalid={errors.requirement ? "true" : "false"}>
              </textarea>
              {errors.requirement && (
                <span role='alert' className='text-red-400 text-sm mt-0.5'>{errors.requirement?.message}</span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-gray-600'>Job Description</label>
              <textarea name="detail[0]desc" id="" className='rounded border border-gray-400
                     focus:outline-none focus:border-blue-500 focus:ring-1
                      text-base px-4 py-2 resize-none'
                rows={4} cols={6} {...register("desc", {
                  required: "write about your company"
                })} aria-invalid={errors.desc ? "true" : "false"}></textarea>
              {errors.about && (
                <span className='text-sm text-red-500 mt-0.5'>{errors.about?.message}</span>
              )}
            </div>
            <div className='mt-2'>
              <CustomButton
                type='Submit'
                containerStyles={`inline-flex justify-center 
                    rounded-md bg-purple-200 text-xl w-40 h-10
                     font-semibold hover:bg-blue-400`}
                disabled={loading}
                title={loading ? <AiOutlineLoading3Quarters
                  className='animate-spin' size={30} /> : "Submit"} />
            </div>
          </form>
        </div>
      </div>
      <div className=' w-full md:w-2/3 2xl:2/4 p-5 mt-4 md:mt-0'>
        <p className='font-bold text-xl'>Recent Job Post:</p>
        <div className='w-full md:flex flex-wrap'>
          {recentPost.slice(0, 4).map((job, index) => {
            const data = {
              name: user?.name,
              email: user?.email,
              logo: user?.profileUrl,
              ...job,
            }
            return <JobCard job={data} key={index}/>
          })}
        </div>

      </div>
    </div>
  )
}
