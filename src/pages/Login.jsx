import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { login, reset } from "../store/authSlice";
import Logo from "../assets/Logo-2.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center p-4 lg:p-8 font-sans overflow-hidden fixed inset-0">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row h-full max-h-[720px]">
        {/* Left Side: Form */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-8 relative overflow-hidden">
          <div className="max-w-[360px] mx-auto w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10  my-3 flex items-center gap-2">
                <img src={Logo} className="h-36 w-36" />
              </div>
            </div>

            <div className="mb-6">
              <Typography
                variant="h3"
                className="text-gray-900 font-black tracking-tight mb-2 text-2xl"
              >
                Welcome back
              </Typography>
              <Typography className="text-gray-400 font-medium text-xs leading-relaxed">
                Enter your credentials to access your AI website builder
                workspace.
              </Typography>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1">
                <Typography
                  variant="small"
                  className="text-gray-900 font-bold ml-1 text-[11px]"
                >
                  Email Address <span className="text-red-500 ml-0.5">*</span>
                </Typography>
                <Input
                  size="md"
                  placeholder="name@company.com"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="!border-gray-200 focus:!border-indigo-500 rounded-lg bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="space-y-1">
                <Typography
                  variant="small"
                  className="text-gray-900 font-bold ml-1 text-[11px]"
                >
                  Password <span className="text-red-500 ml-0.5">*</span>
                </Typography>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    size="md"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="!border-gray-200 focus:!border-indigo-500 rounded-lg bg-white pr-10"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      className="text-gray-500 font-bold text-[11px]"
                    >
                      Remember me
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  color="indigo"
                />
                <Link
                  to="#"
                  className="text-indigo-600 font-bold text-[10px] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                fullWidth
                size="lg"
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 rounded-xl py-3.5 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 normal-case font-black text-sm tracking-wide transition-all transform active:scale-[0.98]"
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            <Typography className="text-center mt-6 text-gray-400 font-bold text-[12px]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:underline font-bold"
              >
                Start building for free
              </Link>
            </Typography>
          </div>
        </div>

        {/* Right Side: Hero Section */}
        <div className="hidden lg:flex w-[55%] bg-indigo-300 relative overflow-hidden items-center justify-center p-12 lg:p-16">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>

          <div className="relative z-10 w-full max-w-[420px]">
            <div className="relative mb-12 group scale-90 lg:scale-100">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 rounded-3xl shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6 overflow-hidden relative">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #4f46e5 12%, transparent 12.1%, transparent 87%, #4f46e5 87.1%), linear-gradient(-45deg, #4f46e5 12%, transparent 12.1%, transparent 87%, #4f46e5 87.1%)",
                      backgroundSize: "40px 40px",
                    }}
                  ></div>
                  <div className="w-full aspect-video bg-white rounded-xl shadow-lg relative z-10 p-3 flex flex-col gap-2">
                    <div className="w-1/3 h-1.5 bg-indigo-50 rounded"></div>
                    <div className="w-full h-0.5 bg-gray-100 rounded"></div>
                    <div className="w-full h-0.5 bg-gray-100 rounded"></div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="aspect-video bg-gray-50 rounded"></div>
                      <div className="aspect-video bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2.5 animate-bounce shadow-indigo-200/50">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    AI Design Ready
                  </span>
                  <span className="text-xs font-black text-gray-900 leading-none">
                    98% Optimized
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-indigo-900/40 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-white shrink-0">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-indigo-100 uppercase tracking-widest">
                    New Feature
                  </span>
                  <span className="text-xs font-black text-white leading-none">
                    Advanced SEO AI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
