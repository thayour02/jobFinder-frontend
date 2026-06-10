import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { apiRequest, handleFileUpload } from '../../utils/store'
import { Login, LogOut } from '../../redux/slice'
import { toast } from 'react-hot-toast'
import { accountType } from '../../utils/data'
import moment from 'moment'

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  Pencil,
  Trash2,
  Briefcase,
  X,
  CheckCircle,
  Plus,
} from 'lucide-react'

import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { LoadingPage, LoadingSpinner } from '../../components/ui/Loading'


const CompanyForm = () => {
  const { open, setOpen } = useContext(GlobalContext)
  const { user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { ...user },
  })
  const dispatch = useDispatch()
  const { loading, setLoading } = useContext(GlobalContext)
  const [profileImg, setProfileImg] = useState('')
  const [profileImgName, setProfileImgName] = useState('')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let imgUrl = ''
      if (profileImg) {
        imgUrl = await handleFileUpload(profileImg)
        if (!imgUrl) {
          toast.error('Upload failed')
          setLoading(false)
          return
        }
      }
      const newData = imgUrl ? { ...data, profileUrl: imgUrl } : data

      const result = await apiRequest({
        url: '/update-profile',
        token: user?.token,
        data: newData,
        method: 'PUT',
      })

      if (!result.success) {
        toast.error(result.message)
      } else {
        toast.success(result.message)
        // Persist the updated profile (incl. the new logo) so redux/localStorage
        // carry profileUrl after reload.
        const updatedUser = { ...user, ...(result.user || newData), token: user?.token }
        dispatch(Login(updatedUser))
        localStorage.setItem('userInfo', JSON.stringify(updatedUser))
        setOpen(false)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={open || false}>
      <Dialog className="relative z-50" as="div" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    Edit Company Profile
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <Input
                      placeholder="eg. Acme Corp"
                      {...register('name', { required: 'Company name is required' })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Location / Address</label>
                    <Input
                      placeholder="eg. Lagos"
                      {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                      <span className="text-red-500 text-xs">{errors.location.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Company Website</label>
                    <Input placeholder="https://example.com" {...register('url')} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contact</label>
                    <Input
                      type="text"
                      placeholder="+234..."
                      {...register('contact', { required: 'Contact is required' })}
                    />
                    {errors.contact && (
                      <span className="text-red-500 text-xs">{errors.contact.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">About Your Company</label>
                    <textarea
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Describe your company..."
                      {...register('about', { required: 'Please write about your company' })}
                    />
                    {errors.about && (
                      <span className="text-red-500 text-xs">{errors.about.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Company Logo</label>
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <span className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {profileImgName || 'Choose Logo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setProfileImg(file)
                            setProfileImgName(file.name)
                          }
                        }}
                      />
                    </label>
                    {profileImgName && (
                      <span className="text-xs text-gray-500 truncate max-w-xs">{profileImgName}</span>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


export default function CompanyProfile() {
  const { open, setOpen } = useContext(GlobalContext)
  const { loading, setLoading } = useContext(GlobalContext)
  const { info, setInfo } = useContext(GlobalContext)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const fetchCompany = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiRequest({
        url: '/get-company-profile',
        method: 'GET',
        token: user?.token,
      })
      if (!res.success) {
        toast.error(res.message)
        setLoading(false)
        return
      }
      setInfo(res?.data)
    } catch (error) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCompany()
  }, [fetchCompany])

  const handledeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const del = await apiRequest({
          url: '/delete-profile',
          method: 'DELETE',
          token: user?.token,
        })
        if (!del.success) {
          toast.error(del.message)
        } else {
          toast.success(del.message)
          dispatch(LogOut())
          window.location.replace('/auth')
        }
      } catch (error) {
        toast.error(error?.message || 'Something went wrong')
      }
    }
  }

  if (loading) return <LoadingPage message="Loading company profile..." />

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">

        {/* Company Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Logo */}
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden ring-4 ring-purple-200 flex-shrink-0">
                {info?.profileUrl ? (
                  <img
                    src={info.profileUrl}
                    alt={info?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-purple-400" />
                )}
              </div>

              {/* Name / meta */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <h1 className="text-3xl font-bold text-gray-900">{info?.name}</h1>
                  {info?.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  ) : null}
                </div>

                {info?.url && (
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-purple-600 hover:underline mt-1 justify-center md:justify-start"
                  >
                    <Globe className="w-4 h-4" />
                    {info.url}
                  </a>
                )}

                <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {info?.location || 'No Location'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-purple-500" />
                    {info?.email || 'No Email'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-purple-500" />
                    {info?.contact || 'No Contact'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <Badge className="bg-purple-100 text-purple-700">
                    <Briefcase className="w-3.5 h-3.5 mr-1" />
                    {info?.jobPosts?.length || 0} Job{info?.jobPosts?.length !== 1 ? 's' : ''} Posted
                  </Badge>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 flex-shrink-0 flex-wrap justify-center">
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Link to="/upload-job">
                  <Button variant="secondary" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Post Job
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handledeleteProfile}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        {info?.about && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-purple-700 text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{info.about}</p>
            </CardContent>
          </Card>
        )}

        {/* Job Posts Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Jobs Posted
              <Badge className="ml-2 bg-purple-100 text-purple-700">
                {info?.jobPosts?.length || 0}
              </Badge>
            </h2>
          </div>

          {info?.jobPosts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {info.jobPosts.map((job, index) => (
                <Link key={index} to={`/job-details/${job?._id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img
                            src={info?.profileUrl}
                            alt={job?.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{job?.jobTitle}</p>
                            <p className="text-sm text-gray-500">{job?.jobType}</p>
                            <span className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job?.location}
                            </span>
                          </div>
                        </div>
                        {accountType !== 'Seeker' && info._id === user._id ? (
                          <span className="text-red-500 font-bold text-sm flex-shrink-0">
                            {job?.application?.length > 0 ? job.application.length : ''}
                          </span>
                        ) : (
                          <span className="text-green-600 font-bold text-sm flex-shrink-0">
                            {job?.vacancy}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {job?.detail?.[0]?.desc?.slice(0, 150)}...
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-purple-100 text-purple-700">{job?.jobType}</Badge>
                        <span className="text-gray-500 text-xs">{moment(job?.createdAt).fromNow()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center text-gray-500">
                <Briefcase className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                No jobs posted yet.{' '}
                <Link to="/upload-job" className="text-purple-600 hover:underline">
                  Post your first job
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CompanyForm />
    </div>
  )
}
