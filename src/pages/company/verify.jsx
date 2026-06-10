import { useContext, useEffect, useState } from "react";
import { apiRequest } from "../../utils/store";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../../redux/slice";
import { toast } from "react-hot-toast";
import { GlobalContext } from "../../context";
import { CheckCircle, XCircle } from "lucide-react";
import { LoadingSpinner } from "../../components/ui/Loading";
import { Card, CardContent } from "../../components/ui/Card";

const VerifyCompanyEmail = () => {
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const { accountType } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const [isRegister] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, id } = useParams();

  useEffect(() => {
    const verifyEmail = async (data) => {
      setLoading(true);
      const response = await apiRequest({
        url: `/verify-user/${id}/${token}`,
        method: "GET",
      });
      setLoading(false);
      if (!response.success) {
        setFailed(true);
        setMessage(response.message);
        toast.error(response.message);
        return;
      }
      setVerified(response.user?.isVerified ?? true);
      setMessage(response.message);
      toast.success(response.message);
      setTimeout(() => {
        dispatch(Login(data));
        window.location.replace("/find-jobs");
      }, 1500);
    };
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id, accountType, dispatch, navigate, setLoading, isRegister]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl text-center">
        <CardContent className="py-12 space-y-4">
          {!verified && !failed && (
            <>
              <LoadingSpinner size="xl" className="mx-auto" />
              <p className="text-gray-600 text-sm">Verifying your company email…</p>
            </>
          )}

          {verified && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Company Email Verified!</h2>
              <p className="text-gray-600 text-sm">{message}</p>
              <p className="text-xs text-gray-400">Redirecting you to the app…</p>
            </>
          )}

          {failed && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Verification Failed</h2>
              <p className="text-gray-600 text-sm">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCompanyEmail;
