import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
  Avatar,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { register, reset } from "../store/authSlice";
import toast from "react-hot-toast";
import Logo from "../assets/logo-2.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
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
    dispatch(register(formData));
  };

  return (
    <div className="h-full w-full bg-gray-50 flex items-center justify-center p-4 py-10  lg:p-8 font-sans overflow-hidden fixed inset-0">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row h-full max-h-[720px]">
        {/* Left Side: Form */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-6 relative overflow-hidden">
          <div className=" mx-auto w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10  my-3 flex items-center gap-2">
                <img src={Logo} className="h-36 w-36" />
              </div>
            </div>

            <div className="mb-4">
              <Typography
                variant="h3"
                className="text-gray-900 font-black tracking-tight mb-2 text-2xl"
              >
                Create an account
              </Typography>
              <Typography className="text-gray-400 font-medium text-xs leading-relaxed">
                Join thousands of creators building with AI.
              </Typography>
            </div>

            <form className="space-y-3" onSubmit={onSubmit}>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 ml-1">
                  <UserIcon className="h-3 w-3 text-gray-400" />
                  <Typography
                    variant="small"
                    className="text-gray-900 font-bold text-[11px]"
                  >
                    Full Name <span className="text-red-500 ml-0.5">*</span>
                  </Typography>
                </div>
                <Input
                  size="md"
                  placeholder="John Doe"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="!border-gray-200 focus:!border-indigo-500 rounded-lg bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 ml-1">
                  <EnvelopeIcon className="h-3 w-3 text-gray-400" />
                  <Typography
                    variant="small"
                    className="text-gray-900 font-bold text-[11px]"
                  >
                    Email Address <span className="text-red-500 ml-0.5">*</span>
                  </Typography>
                </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 ml-1">
                    <LockClosedIcon className="h-3 w-3 text-gray-400" />
                    <Typography
                      variant="small"
                      className="text-gray-900 font-bold text-[11px]"
                    >
                      Password <span className="text-red-500 ml-0.5">*</span>
                    </Typography>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      size="md"
                      placeholder="••••••••"
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
                        <EyeSlashIcon className="h-3 w-3" />
                      ) : (
                        <EyeIcon className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 ml-1">
                    <LockClosedIcon className="h-3 w-3 text-gray-400" />
                    <Typography
                      variant="small"
                      className="text-gray-900 font-bold text-[11px]"
                    >
                      Confirm <span className="text-red-500 ml-0.5">*</span>
                    </Typography>
                  </div>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      size="md"
                      placeholder="••••••••"
                      className="!border-gray-200 focus:!border-indigo-500 rounded-lg bg-white pr-10"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-3 w-3" />
                      ) : (
                        <EyeIcon className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      className="text-gray-500 font-medium text-[11px] leading-tight"
                    >
                      I agree to the{" "}
                      <span className="text-indigo-600 font-bold underline cursor-pointer">
                        Terms
                      </span>{" "}
                      and{" "}
                      <span className="text-indigo-600 font-bold underline cursor-pointer">
                        Privacy
                      </span>
                      .
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  color="indigo"
                  required
                />
              </div>

              <Button
                fullWidth
                size="lg"
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 rounded-xl py-3.5 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 normal-case font-black text-sm tracking-wide transition-all transform active:scale-[0.98]"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <Typography className="text-center my-3 text-gray-400 font-bold text-[12px]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-black"
              >
                Log in here
              </Link>
            </Typography>
          </div>
        </div>

        {/* Right Side: Visual Section */}
        <div className="hidden lg:flex w-[50%] bg-indigo-300 relative overflow-hidden items-end justify-center p-12 lg:p-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-400 rounded-full blur-[100px] opacity-40"></div>
            <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
            <div
              className="absolute inset-0 bg-no-repeat bg-center opacity-60 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
                opacity: 0.15,
              }}
            ></div>
          </div>

          <div className="relative z-10 w-full max-w-[420px] mb-8 scale-90 lg:scale-100">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 lg:p-8 rounded-[2rem] shadow-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <Typography className="text-white text-lg font-medium leading-relaxed italic mb-5">
                "The AI builder transformed our workflow. We launched our
                landing page in under 30 minutes instead of three days."
              </Typography>
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="avatar"
                  className="w-9 h-9 border-2 border-white/20"
                />
                <div>
                  <Typography className="text-white font-bold leading-none mb-1 text-[12px]">
                    Alex Rivers
                  </Typography>
                  <Typography className="text-indigo-200 text-[9px] font-medium uppercase tracking-wider">
                    Founder at TechFlow
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
