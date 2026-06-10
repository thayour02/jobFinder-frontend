import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GlobalContext } from '../../context'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { apiRequest } from '../../utils/store'
import NoProfile from '../../assets/images.jpeg'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { LoadingPage } from '../../components/ui/Loading'
import {
    User,
    MapPin,
    Mail,
    Phone,
    CheckCircle,
    Briefcase,
    FileText,
} from 'lucide-react'
import { FaLinkedin as Linkedin, FaGithub as Github, FaTwitter as Twitter } from 'react-icons/fa'

const Applicants = () => {
    const { loading } = useContext(GlobalContext)
    const { info, setInfo } = useContext(GlobalContext)
    const { setStatus } = useContext(GlobalContext)
    const { setInfoo } = useContext(GlobalContext)

    const { user } = useSelector((state) => state.user)
    const { applicationId, userId } = useParams()

    const fetchApplicant = async () => {
        const response = await apiRequest({
            url: `/applicant/${applicationId}/${userId}`,
            method: 'GET',
            token: user?.token,
        })
        if (!response.success) {
            toast.error(response.message)
            return
        }
        setInfo(response)
    }

    useEffect(() => {
        fetchApplicant()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationId, userId])

    const handleSetStatus = async (newStatus) => {
        const res = await apiRequest({
            url: `/update-application/${applicationId}/${userId}`,
            method: 'PUT',
            data: { status: newStatus },
            token: user?.token,
        })
        if (!res.success) {
            toast.error(res.message)
            return
        }
        setStatus(newStatus)
        setInfoo((prevInfo) => ({
            ...prevInfo,
            application: prevInfo?.application?.map((app) =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ),
        }))
        toast.success(res?.message)
    }

    const applicant = info?.application?.user

    if (loading) return <LoadingPage message="Loading applicant..." />

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-20">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {/* Header Card */}
                <Card>
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0 self-center md:self-start">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                                    {applicant?.profileUrl ? (
                                        <img
                                            src={applicant.profileUrl}
                                            alt={`${applicant?.firstName} ${applicant?.LastName}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = NoProfile }}
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
                                        {applicant?.firstName} {applicant?.LastName}
                                    </h1>
                                    {applicant?.isVerified && (
                                        <CheckCircle className="w-6 h-6 text-purple-600 self-center" />
                                    )}
                                </div>

                                {applicant?.jobTitle && (
                                    <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                                        <Briefcase className="w-4 h-4 text-purple-600" />
                                        <span className="text-purple-600 font-semibold">{applicant.jobTitle}</span>
                                    </div>
                                )}

                                {/* Contact badges */}
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                                    {info?.location && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <MapPin className="w-3 h-3" />
                                            {info.location}
                                        </Badge>
                                    )}
                                    {applicant?.email && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <Mail className="w-3 h-3" />
                                            {applicant.email}
                                        </Badge>
                                    )}
                                    {applicant?.contact && (
                                        <Badge variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3">
                                            <Phone className="w-3 h-3" />
                                            {applicant.contact}
                                        </Badge>
                                    )}
                                </div>

                                {/* Social links */}
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                                    {applicant?.socialMedia?.linkedin && (
                                        <a
                                            href={applicant.socialMedia.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            LinkedIn
                                        </a>
                                    )}
                                    {applicant?.socialMedia?.github && (
                                        <a
                                            href={applicant.socialMedia.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    )}
                                    {applicant?.socialMedia?.twitter && (
                                        <a
                                            href={applicant.socialMedia.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-medium"
                                        >
                                            <Twitter className="w-4 h-4" />
                                            Twitter
                                        </a>
                                    )}
                                </div>

                                {/* Action buttons — only for non-seekers */}
                                {user?.accountType !== 'Seeker' && (
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        {(info?.application?.resume || applicant?.userCv) && (
                                            <a
                                                href={info?.application?.resume || applicant?.userCv}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-10 px-4 text-sm font-medium transition-colors"
                                            >
                                                <FileText className="w-4 h-4 mr-2" /> View CV
                                            </a>
                                        )}
                                        <Button
                                            onClick={() => handleSetStatus('Approved')}
                                            variant="default"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleSetStatus('Rejected')}
                                            variant="destructive"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* About Card */}
                {applicant?.about && (
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-xl font-bold text-purple-800 mb-4 uppercase tracking-wide">About</h2>
                            <p className="text-gray-700 leading-7 text-justify">{applicant.about}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Applicants
