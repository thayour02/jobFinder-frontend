import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState, Fragment } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { apiRequest, handleFileUpload } from "../../utils/store";
import { GlobalContext } from "../../context";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner, LoadingPage } from "../../components/ui/Loading";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Calendar,
  BadgeCheck,
  Building2,
  Trash2,
  Send,
  Mail,
  X,
  ArrowRight,
  Upload,
  FileText,
} from "lucide-react";

const ApplicationForm = () => {
  const { open, setOpen } = useContext(GlobalContext);
  const { setInfo } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  const { user } = useSelector((state) => state.user);

  const [cvFile, setCvFile] = useState("");
  const [cvName, setCvName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const params = useParams();
  const userId = user?._id;
  const jobId = params.id;

  const onSubmit = async (e) => {
    e.preventDefault();

    // Resolve the CV: a freshly uploaded file takes priority, otherwise fall
    // back to the CV saved on the user's profile.
    let resume = user?.userCv || "";
    if (cvFile) {
      setLoading(true);
      resume = await handleFileUpload(cvFile, 'raw');
      setLoading(false);
      if (!resume) {
        toast.error("CV upload failed. Please try again.");
        return;
      }
    }

    if (!resume) {
      toast.error("Please attach a CV, or upload one in your profile first.");
      return;
    }

    setOpen(false);
    setLoading(true);
    const res = await apiRequest({
      url: `/apply-job/${userId}/${jobId}`,
      method: "POST",
      data: { resume, coverLetter },
      token: user?.token,
    });
    setLoading(false);
    if (!res.success) {
      toast.error(res.message || "Failed to apply");
      return;
    }
    toast.success(res.message || "Application submitted");
    setInfo(res?.data);
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <Transition appear show={open} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    Apply for this job
                  </Dialog.Title>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
                  {/* Existing profile CV */}
                  {user?.userCv && !cvFile && (
                    <div className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <span className="flex items-center gap-2 text-sm text-gray-700 min-w-0">
                        <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="truncate">Using your profile CV</span>
                      </span>
                      <a
                        href={user.userCv}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-purple-600 hover:underline shrink-0"
                      >
                        View
                      </a>
                    </div>
                  )}

                  {/* Upload / replace CV */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      {user?.userCv ? "Upload a different CV (optional)" : "Upload your CV"}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <span className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {cvName || "Choose file (PDF / DOC)"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setCvFile(file);
                            setCvName(file.name);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Optional cover letter */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Cover letter (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="A short note to the employer..."
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? (
                      <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
    <div className="text-purple-600 mb-1">{icon}</div>
    <span className="text-xs text-gray-500">{label}</span>
    <p className="text-base font-semibold text-gray-900">{value}</p>
  </div>
);

export default function Jobdetails() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [selected, setSelected] = useState("0");
  const { isFetching, setIsFetching } = useContext(GlobalContext);
  const { similarJob, setSimilarJob } = useContext(GlobalContext);
  const { setOpen } = useContext(GlobalContext);
  const { info, setInfo } = useContext(GlobalContext);

  const getJobDetails = async () => {
    setIsFetching(true);
    const res = await apiRequest({ url: `/jobs/job-detail/${id}`, method: "GET" });
    setIsFetching(false);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setJob(res?.data);
    setSimilarJob(res?.similarJob || []);
  };

  useEffect(() => {
    if (id) getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const fetchApplications = async () => {
    const res = await apiRequest({
      url: `/jobs/get-applicants/${id}`,
      method: "GET",
      token: user?.token,
    });
    if (!res.success) return;
    setInfo(res?.data || []);
  };

  useEffect(() => {
    if (id) fetchApplications();
  }, [id]);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const res = await apiRequest({
      url: "/jobs/delete-job/" + id,
      token: user?.token,
      method: "DELETE",
    });
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message || "Job deleted");
    setTimeout(() => window.location.replace("/"), 1000);
  };

  if (isFetching) return <LoadingPage message="Loading job..." />;

  const isOwner = user?._id === job?.company?._id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardContent className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  {job?.company?.profileUrl ? (
                    <img
                      src={job.company.profileUrl}
                      alt={job?.company?.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-purple-600" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job?.jobTitle}</h1>
                    <p className="text-gray-600">{job?.company?.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job?.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {moment(job?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
                <BadgeCheck className="w-7 h-7 text-purple-600 shrink-0" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
                <StatBox icon={<DollarSign className="w-5 h-5" />} label="Salary" value={`$${job?.salary || 0}`} />
                <StatBox icon={<Briefcase className="w-5 h-5" />} label="Job Type" value={job?.jobType} />
                {isOwner ? (
                  <Link to={`/applications/${job?._id}`}>
                    <StatBox
                      icon={<Users className="w-5 h-5" />}
                      label="Applicants"
                      value={job?.application?.length || 0}
                    />
                  </Link>
                ) : (
                  <StatBox
                    icon={<Users className="w-5 h-5" />}
                    label="Applicants"
                    value={job?.application?.length || 0}
                  />
                )}
                <StatBox icon={<Users className="w-5 h-5" />} label="Vacancies" value={job?.vacancy} />
                <StatBox icon={<Calendar className="w-5 h-5" />} label="Experience" value={`${job?.experience || 0} yr`} />
              </div>

              {/* Tabs */}
              <div className="flex gap-3 border-b border-gray-100 mb-6">
                {[
                  { key: "0", label: "Job Description" },
                  { key: "1", label: "Company" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelected(tab.key)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selected === tab.key
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="text-gray-700 leading-relaxed">
                {selected === "0" ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                    <p className="whitespace-pre-line">{job?.detail?.[0]?.desc}</p>
                    {job?.detail?.[0]?.requirement && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Requirements</h3>
                        <p className="whitespace-pre-line">{job.detail[0].requirement}</p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-purple-700">{job?.company?.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job?.company?.location}</span>
                    </div>
                    <p className="flex items-center gap-2 mt-1 text-gray-600">
                      <Mail className="w-4 h-4" /> {job?.company?.email}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">About Company</h3>
                    <p className="whitespace-pre-line">{job?.company?.about}</p>
                  </>
                )}
              </div>

              {/* Action */}
              <div className="mt-8">
                {isOwner ? (
                  <Button variant="destructive" size="lg" className="w-full" onClick={handleDeletePost}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Job
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
                    <Send className="w-4 h-4 mr-2" /> Apply Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          {isOwner ? (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Applicants</h2>
              {!info || info.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-sm text-gray-500">
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    No applicants yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {info.map((a, index) => (
                    <Link to={`/applicant-profile/${a._id}/${a?.user?._id}`} key={a._id || index}>
                      <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-4 flex items-center gap-3">
                          {a?.user?.profileUrl ? (
                            <img
                              src={a.user.profileUrl}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                              {(a?.user?.firstName || "?").charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {a?.user?.firstName} {a?.user?.LastName || ""}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{a?.user?.email}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-purple-600 shrink-0" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {(similarJob || []).slice(0, 4).map((s, index) => (
                  <Link to={`/job-details/${s?._id}`} key={s?._id || index}>
                    <Card className="transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 truncate">{s?.jobTitle}</p>
                            <p className="text-xs text-gray-500 truncate">{s?.company?.name}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {s?.jobType && <Badge variant="secondary">{s.jobType}</Badge>}
                              {s?.location && (
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3" /> {s.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ApplicationForm />
    </div>
  );
}
