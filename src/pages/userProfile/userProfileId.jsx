import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GlobalContext } from '../../context'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { apiRequest } from '../../utils/store'
import NoProfile from '../../assets/images.jpeg'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { LoadingPage } from '../../components/ui/Loading'
import {
    User,
    MapPin,
    Mail,
    Phone,
    CheckCircle,
    Briefcase,
} from 'lucide-react'
import { FaLinkedin as Linkedin, FaGithub as Github, FaTwitter as Twitter } from 'react-icons/fa'

export default function UserProfileId() {
    const { loading, setLoading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)
    const { user } = useSelector((state) => state.user)
    const params = useParams()

    const fetchUser = useCallback(async () => {
        setLoading(true)
        const id = params?.id || user?._id
        const res = await apiRequest({
            url: `/users/get-user/${id}`,
            method: 'GET',
        })
        if (!res.success) {
            toast.error(res.message)
            setLoading(false)
            return
        }
        setInfo(res?.data)
        setLoading(false)
    }, [params?.id, user?._id])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    if (loading) return <LoadingPage message="Loading profile..." />

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header Card */}
                <Card className="mb-6">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0 self-center md:self-start">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                                    {info?.profileUrl ? (
                                        <img
                                            src={info.profileUrl}
                                            alt={`${info?.firstName} ${info?.LastName}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-purple-400" />
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {info?.firstName} {info?.LastName}
                                    </h1>
                                    {info?.isVerified && (
                                        <CheckCircle className="w-6 h-6 text-purple-600 self-center" />
                                    )}
                                </div>

                                {info?.jobTitle && (
                                    <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                                        <Briefcase className="w-4 h-4 text-purple-600" />
                                        <span className="text-purple-600 font-semibold">{info.jobTitle}</span>
                                    </div>
                                )}

                                {/* Contact row */}
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                                    {info?.location && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <MapPin className="w-3 h-3" />
                                            {info.location}
                                        </Badge>
                                    )}
                                    {info?.email && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <Mail className="w-3 h-3" />
                                            {info.email}
                                        </Badge>
                                    )}
                                    {info?.contact && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <Phone className="w-3 h-3" />
                                            {info.contact}
                                        </Badge>
                                    )}
                                </div>

                                {/* Social links */}
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                                    {info?.socialMedia?.linkedin && (
                                        <a
                                            href={info.socialMedia.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            LinkedIn
                                        </a>
                                    )}
                                    {info?.socialMedia?.github && (
                                        <a
                                            href={info.socialMedia.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    )}
                                    {info?.socialMedia?.twitter && (
                                        <a
                                            href={info.socialMedia.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Twitter className="w-4 h-4" />
                                            Twitter
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* About Card */}
                {info?.about && (
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-xl font-bold text-purple-800 mb-4 uppercase tracking-wide">About</h2>
                            <p className="text-gray-700 leading-7 text-justify">{info.about}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
