import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "../../utils/store";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/Loading";
import { Mail, Loader2 } from "lucide-react";

export default function Reset() {
  const { accountType, setAccountType } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let URL = accountType === "Seeker" ? "/user/forgot-password" : "/forgotten-password";

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await apiRequest({
      url: URL,
      method: "POST",
      data: { email: data.email },
    });
    setLoading(false);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a reset link.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Account type toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                accountType === "Seeker"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setAccountType("Seeker")}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                accountType !== "Seeker"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setAccountType("Company")}
            >
              Company
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email", { required: "Email Address is required!" })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/auth" className="text-purple-600 hover:text-purple-700 font-medium underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
