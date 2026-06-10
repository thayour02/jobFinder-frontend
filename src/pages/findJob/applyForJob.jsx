import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import { toast } from "react-hot-toast";
import { apiRequest } from "../../utils/store";
import { GlobalContext } from "../../context";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { MapPin, Mail, Users, ArrowRight } from "lucide-react";

export default function Application() {
  const { user } = useSelector((state) => state.user);
  const { info, setInfo } = useContext(GlobalContext);
  const { id } = useParams();

  const fetchApplications = async () => {
    const res = await apiRequest({
      url: `/jobs/get-applicants/${id}`,
      method: "GET",
      token: user?.token,
    });
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setInfo(res?.data || []);
  };

  useEffect(() => {
    if (id) fetchApplications();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
            <p className="text-gray-600 text-sm">
              {info?.length || 0} candidate{(info?.length || 0) === 1 ? "" : "s"} for this role
            </p>
          </div>
        </div>

        {!info || info.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No applicants yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back later once candidates start applying.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.map((job, index) => (
              <motion.div
                key={job._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/applicant-profile/${job._id}/${job.user?._id}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5">
                    <CardContent className="p-5 flex flex-col gap-4 h-full">
                      <div className="flex items-center gap-4">
                        {job?.user?.profileUrl ? (
                          <img
                            src={job.user.profileUrl}
                            alt={job?.user?.firstName || "applicant"}
                            className="w-14 h-14 rounded-full object-cover border border-gray-100"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-lg">
                            {(job?.user?.firstName || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {job?.user?.firstName} {job?.user?.LastName || ""}
                          </p>
                          {job?.user?.jobTitle && (
                            <Badge variant="secondary" className="mt-1">
                              {job.user.jobTitle}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5 text-sm text-gray-600">
                        {job?.user?.location && (
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{job.user.location}</span>
                          </p>
                        )}
                        {job?.user?.email && (
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{job.user.email}</span>
                          </p>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                          Applied {moment(job?.appliedAt).fromNow()}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-purple-600">
                          View <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
