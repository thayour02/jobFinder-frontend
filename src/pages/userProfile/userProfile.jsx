import { useContext, Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalContext } from '../../context'
import { Transition, Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { apiRequest, handleFileUpload } from '../../utils/store'
import { Login, LogOut } from '../../redux/slice'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NoProfile from '../../assets/images.jpeg'

import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  Pencil,
  Trash2,
  CheckCircle,
  Briefcase,
  X,
} from 'lucide-react'
import { FaLinkedin as Linkedin, FaGithub as Github, FaTwitter as Twitter } from 'react-icons/fa'

import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { LoadingPage, LoadingSpinner } from '../../components/ui/Loading'


const UserProfileForm = () => {
  const [profileImg, setProfileImg] = useState('')
  const [profileImgName, setProfileImgName] = useState('')
  const [cvFile, setCvFile] = useState('')
  const [cvName, setCvName] = useState('')
  const { open, setOpen } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
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

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let imgUrl = ''
      if (profileImg) {
        imgUrl = await handleFileUpload(profileImg)
        if (!imgUrl) {
          toast.error('Image upload failed')
          setLoading(false)
          return
        }
      }

      let cvUrl = ''
      if (cvFile) {
        cvUrl = await handleFileUpload(cvFile, 'raw')
        if (!cvUrl) {
          toast.error('CV upload failed')
          setLoading(false)
          return
        }
      }

      const newData = { ...data }
      if (imgUrl) newData.profileUrl = imgUrl
      if (cvUrl) newData.userCv = cvUrl

      const result = await apiRequest({
        url: '/users/update-user',
        token: user?.token,
        data: newData,
        method: 'PUT',
      })

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      // Persist the server's updated user (keep the existing token) so redux /
      // localStorage carry the new profileUrl + userCv for applying to jobs.
      const updatedUser = { ...user, ...(result.user || newData), token: user?.token }
      dispatch(Login(updatedUser))
      localStorage.setItem('userInfo', JSON.stringify(updatedUser))
      setOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={open}>
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
                    Edit Profile
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
                  <div className="flex gap-3">
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <Input
                        placeholder="eg. Comfort"
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                      )}
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <Input
                        placeholder="eg. Doe"
                        {...register('LastName', { required: 'Last name is required' })}
                      />
                      {errors.LastName && (
                        <span className="text-red-500 text-xs">{errors.LastName.message}</span>
                      )}
                    </div>
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

                  <div className="flex gap-3">
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Phone / Contact</label>
                      <Input
                        type="number"
                        placeholder="Phone number"
                        {...register('contact', { required: 'Contact is required' })}
                      />
                      {errors.contact && (
                        <span className="text-red-500 text-xs">{errors.contact.message}</span>
                      )}
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Job Title</label>
                      <Input
                        placeholder="eg. Software Engineer"
                        {...register('jobTitle', { required: 'Job title is required' })}
                      />
                      {errors.jobTitle && (
                        <span className="text-red-500 text-xs">{errors.jobTitle.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                      <Input placeholder="LinkedIn URL" {...register('linkedin')} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">GitHub</label>
                      <Input placeholder="GitHub URL" {...register('github')} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Twitter</label>
                      <Input placeholder="Twitter URL" {...register('twitter')} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Portfolio</label>
                      <Input placeholder="Portfolio URL" {...register('portfolio')} />
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <label className="text-sm font-medium text-gray-700">Facebook</label>
                      <Input placeholder="Facebook URL" {...register('facebook')} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">About You</label>
                    <textarea
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Write a short bio..."
                      {...register('about', { required: 'Please write about yourself' })}
                    />
                    {errors.about && (
                      <span className="text-red-500 text-xs">{errors.about.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <span className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {profileImgName || 'Choose Image'}
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

                  {/* CV / Resume */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">CV / Resume</label>
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <span className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {cvName || 'Upload CV (PDF / DOC)'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setCvFile(file)
                            setCvName(file.name)
                          }
                        }}
                      />
                    </label>
                    {!cvName && user?.userCv && (
                      <a
                        href={user.userCv}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-purple-600 hover:underline w-fit"
                      >
                        View current CV
                      </a>
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


export default function UserProfile() {
  const { open, setOpen } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const { info, setInfo } = useContext(GlobalContext)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const res = await apiRequest({
          url: '/users/get-user',
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
    }
    fetchUserProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const del = await apiRequest({
          url: '/users/delete-user',
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

  if (loading) return <LoadingPage message="Loading profile..." />

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">

        {/* Profile Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden ring-4 ring-purple-200">
                  {info?.profileUrl ? (
                    <img
                      src={info.profileUrl}
                      alt={info?.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={NoProfile}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Name / title / meta */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {info?.firstName} {info?.LastName}
                  </h1>
                  {info?.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  ) : null}
                </div>
                <p className="text-purple-600 font-semibold mt-1">
                  {info?.jobTitle || 'Add Job Title'}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-sm text-gray-600">
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

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  {info?.socialMedia?.linkedin && (
                    <a href={info.socialMedia.linkedin} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer hover:bg-purple-100">
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </Badge>
                    </a>
                  )}
                  {info?.socialMedia?.github && (
                    <a href={info.socialMedia.github} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer hover:bg-purple-100">
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </Badge>
                    </a>
                  )}
                  {info?.socialMedia?.twitter && (
                    <a href={info.socialMedia.twitter} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer hover:bg-purple-100">
                        <Twitter className="w-3.5 h-3.5" /> Twitter
                      </Badge>
                    </a>
                  )}
                  {info?.socialMedia?.facebook && (
                    <a href={info.socialMedia.facebook} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer hover:bg-purple-100">
                        <Globe className="w-3.5 h-3.5" /> Facebook
                      </Badge>
                    </a>
                  )}
                  {info?.socialMedia?.portfolio && (
                    <a href={info.socialMedia.portfolio} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer hover:bg-purple-100">
                        <User className="w-3.5 h-3.5" /> Portfolio
                      </Badge>
                    </a>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-700 text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {info?.about || 'No bio provided yet.'}
            </p>
          </CardContent>
        </Card>

        {/* CV / Resume Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-700 text-lg">CV / Resume</CardTitle>
          </CardHeader>
          <CardContent>
            {info?.userCv ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm">Your CV is uploaded and ready for applications.</span>
                </div>
                <a
                  href={info.userCv}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 text-sm font-medium transition-colors w-fit"
                >
                  View CV
                </a>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-gray-500 text-sm">
                  No CV uploaded yet. Add one so you can apply for jobs.
                </p>
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                  <Upload className="w-4 h-4 mr-1" /> Upload CV
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Applications Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Jobs Applied For
              <Badge className="ml-2 bg-purple-100 text-purple-700">
                {info?.application?.length || 0}
              </Badge>
            </h2>
          </div>

          {info?.application?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.application.map((job, index) => (
                <Link to={`/job-details/${job.job?._id}`} key={index}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img
                            src={job?.job?.company?.profileUrl}
                            alt={job?.job?.company?.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{job?.job?.company?.name}</p>
                            <p className="text-gray-700 font-medium">{job?.job?.jobTitle}</p>
                            <p className="text-sm text-gray-500">{job?.job?.jobType}</p>
                            <span className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job?.job?.location}
                            </span>
                          </div>
                        </div>
                        <span className="text-purple-500 font-bold text-sm flex-shrink-0">
                          {job?.job?.vacancy} slots
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {job?.job?.detail?.[0]?.desc?.slice(0, 150)}...
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-purple-100 text-purple-700">{job?.status}</Badge>
                        <span className="text-purple-900 font-semibold text-sm">
                          ${job?.job?.salary}
                        </span>
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
                No job applications yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <UserProfileForm />
    </div>
  )
}
