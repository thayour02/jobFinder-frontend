import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "../../utils/store";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function ResetPassword() {
  const { accountType, setAccountType } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { id, token } = useParams();

  const URL =
    accountType === "Seeker"
      ? `/user/reset-password/${id}/${token}`
      : `/reset-password/${id}/${token}`;

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await apiRequest({
      url: URL,
      method: "POST",
      data: { password: data.password },
    });
    setLoading(false);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setTimeout(() => {
      window.location.replace("/auth");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-purple-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Set New Password</CardTitle>
          <CardDescription>Choose a strong password for your account.</CardDescription>
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
              User Account
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
            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pr-10"
                  {...register("password", { required: "Password is required!" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="cPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="cPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="pr-10"
                  {...register("cPassword", {
                    validate: (value) => {
                      const { password } = getValues();
                      if (password !== value) return "Passwords do not match";
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.cPassword?.type === "validate" && (
                <p className="text-xs text-red-500">{errors.cPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
