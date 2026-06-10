import { useCallback, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { apiRequest } from '../../utils/store'
import { toast } from 'react-hot-toast'
import { accountType } from '../../utils/data'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { LoadingPage } from '../../components/ui/Loading'
import {
    MapPin,
    Mail,
    Phone,
    Globe,
    Building2,
    CheckCircle,
    Briefcase,
    Calendar,
    ArrowLeft,
} from 'lucide-react'

export default function CompanyProfileById() {
    const { setLoading, loading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)
    const params = useParams()
    const { user } = useSelector((state) => state.user)

    const fetchCompany = useCallback(async () => {
        setLoading(true)
        const id = params?.id || user?._id
        const res = await apiRequest({
            url: `/get-company/${id}`,
            method: 'GET',
        })
        if (!res.success) {
            toast.error(res.message)
            setInfo(null)
            setLoading(false)
            return
        }
        setInfo(res?.data)
        setLoading(false)
    }, [params?.id, user?._id])

    useEffect(() => {
        fetchCompany()
    }, [fetchCompany])

    if (loading) return <LoadingPage message="Loading company..." />

    if (!info) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center">
                    <CardContent className="p-10">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building2 className="w-10 h-10 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Company Not Found</h2>
                        <p className="text-gray-500 mb-6">
                            The company profile you're looking for doesn't exist or has been removed.
                        </p>
                        <Link
                            to="/company"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Browse Companies
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-20">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {/* Company Header */}
                <Card>
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Logo / Avatar */}
                            <div className="flex-shrink-0 self-center md:self-start">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                                    {info?.profileUrl ? (
                                        <img
                                            src={info.profileUrl}
                                            alt={info.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Building2 className="w-12 h-12 text-purple-400" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{info?.name}</h1>
                                    {info?.isVerified && (
                                        <CheckCircle className="w-6 h-6 text-purple-600" />
                                    )}
                                </div>

                                {info?.url && (
                                    <a
                                        href={info.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-800 hover:underline mb-4 text-sm font-medium"
                                    >
                                        <Globe className="w-4 h-4" />
                                        {info.url}
                                    </a>
                                )}

                                <div className="flex flex-wrap gap-3 mt-3">
                                    {info?.location && (
                                        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                                            <MapPin className="w-3 h-3" />
                                            {info.location}
                                        </Badge>
                                    )}
                                    {info?.email && (
                                        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                                            <Mail className="w-3 h-3" />
                                            {info.email}
                                        </Badge>
                                    )}
                                    {info?.contact && (
                                        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                                            <Phone className="w-3 h-3" />
                                            {info.contact}
                                        </Badge>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600">{info?.jobPosts?.length ?? 0}</p>
                                        <p className="text-xs text-gray-500 font-medium">Job Posts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Job Postings */}
                {info?.jobPosts?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Postings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {info.jobPosts.map((job, index) => (
                                <Link key={index} to={`/job-details/${job?._id}`}>
                                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                                            {/* Top row */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex gap-3 items-start">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0 flex items-center justify-center">
                                                        {info?.profileUrl ? (
                                                            <img
                                                                src={info.profileUrl}
                                                                alt={info.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <Building2 className="w-6 h-6 text-purple-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 font-semibold leading-tight">{job?.jobTitle}</p>
                                                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                                                            <MapPin className="w-3 h-3" />
                                                            {job?.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                {accountType !== 'Seeker' && info._id === user?._id ? (
                                                    <Badge variant="destructive" className="text-xs flex-shrink-0">
                                                        {job?.application?.length > 0 ? job.application.length : '0'} apps
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="success" className="text-xs flex-shrink-0">
                                                        {job?.vacancy} open
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {job?.detail?.[0]?.desc?.slice(0, 150)}
                                                {job?.detail?.[0]?.desc?.length > 150 ? '...' : ''}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                <Badge variant="secondary">{job?.jobType}</Badge>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {moment(job?.createdAt).fromNow()}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {info?.jobPosts?.length === 0 && (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No job postings yet</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
