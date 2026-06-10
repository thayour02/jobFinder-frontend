import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import { GlobalContext } from '../../context'
import { apiRequest } from '../../utils/store'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { LoadingSpinner } from '../../components/ui/Loading'
import { Briefcase, MapPin, DollarSign, Users, Building2 } from 'lucide-react'

const types = ["Full-Time", "Part-Time", "Contract", "Intern"]

const selectClasses =
  "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
const labelClasses = "block text-sm font-medium text-gray-700 mb-1"
const errorClasses = "text-red-500 text-xs mt-1"

export default function PostJob() {
  const { user } = useSelector((state) => state.user)
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {},
  })

  const { loading, setLoading } = useContext(GlobalContext)
  const { recentPost, setRecentPost } = useContext(GlobalContext)
  const [jobType, setJobType] = useState('Full-Time')

  const onSubmit = async (data) => {
    setLoading(true)
    const newData = { ...data, jobType }
    const res = await apiRequest({
      url: '/jobs/postjob',
      method: "POST",
      data: newData,
      token: user?.token,
    })
    setLoading(false)
    if (!res.success) {
      toast.error(res.message || 'Failed to post job')
      return
    }
    toast.success(res.message || 'Job posted successfully')
    setTimeout(() => window.location.reload(), 1500)
  }

  const recentJob = async () => {
    const id = user?._id
    const res = await apiRequest({ url: "/get-company/" + id, method: "GET" })
    if (!res.success) return
    setRecentPost(res?.data?.jobPosts || [])
  }

  useEffect(() => {
    recentJob()
  }, [user?._id])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle>Post a Job</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className={labelClasses}>Job Title</label>
                  <Input
                    placeholder="e.g. Software Engineer"
                    {...register('jobTitle', { required: 'Job title is required' })}
                  />
                  {errors.jobTitle && <p className={errorClasses}>{errors.jobTitle.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Job Type</label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className={selectClasses}
                    >
                      {types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Salary (USD)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 4500"
                      {...register('salary', { required: 'Salary is required' })}
                    />
                    {errors.salary && <p className={errorClasses}>{errors.salary.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>No. of Vacancies</label>
                    <Input
                      type="number"
                      placeholder="e.g. 2"
                      {...register('vacancy', { required: 'No. of vacancies is required' })}
                    />
                    {errors.vacancy && <p className={errorClasses}>{errors.vacancy.message}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>Years of Experience</label>
                    <Input
                      type="number"
                      placeholder="e.g. 3"
                      {...register('experience', { required: 'Years of experience is required' })}
                    />
                    {errors.experience && <p className={errorClasses}>{errors.experience.message}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Job Location</label>
                  <Input
                    placeholder="e.g. Lagos"
                    {...register('location', { required: 'Job location is required' })}
                  />
                  {errors.location && <p className={errorClasses}>{errors.location.message}</p>}
                </div>

                <div>
                  <label className={labelClasses}>Job Requirements</label>
                  <textarea
                    rows={3}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 resize-none"
                    {...register("requirement", { required: "Write about the job requirements" })}
                  />
                  {errors.requirement && <p className={errorClasses}>{errors.requirement.message}</p>}
                </div>

                <div>
                  <label className={labelClasses}>Job Description</label>
                  <textarea
                    rows={5}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 resize-none"
                    {...register("desc", { required: "Write a job description" })}
                  />
                  {errors.desc && <p className={errorClasses}>{errors.desc.message}</p>}
                </div>

                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? <LoadingSpinner size="sm" className="border-white border-t-transparent" /> : "Submit Job"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent posts */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Job Posts</h2>
          <div className="space-y-4">
            {(recentPost || []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-gray-500">
                  <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  No jobs posted yet.
                </CardContent>
              </Card>
            ) : (
              (recentPost || []).slice(0, 5).map((job, index) => (
                <Link to={`/job-details/${job?._id}`} key={job?._id || index}>
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate">{job?.jobTitle}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {job?.jobType && <Badge variant="secondary">{job.jobType}</Badge>}
                            {job?.location && (
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" /> {job.location}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                            {job?.salary && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> {job.salary}
                              </span>
                            )}
                            {job?.vacancy && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {job.vacancy} vacancies
                              </span>
                            )}
                            {job?.createdAt && <span>{moment(job.createdAt).fromNow()}</span>}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
