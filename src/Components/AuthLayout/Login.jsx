import { use, useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../Loader/loading";

const Login = () => {
  const { login, signInWithGoogle } = use(AuthContext);
  const [showPassword, SetshowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate(location.state || "/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
 
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("after signInWithGoogle:", user);
        navigate(location.state || "/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };


    const {loading} = use(AuthContext);
  if(loading){
    return <Loading></Loading>
  }

  return (
    <div className="bg-base-200 w-full min-h-screen mt-10 md:mt-0 md:p-10 lg:p-20">
      <div className="bg-white max-w-4xl mx-auto p-4 md:p-8 lg:p-10 rounded-md shadow-sm ">
        <div className="text-center space-y-2 md:mb-0 mb-4">
          <h1 className="text-4xl font-bold">Login Now!</h1>
          <p>
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary hover:underline cursor-pointer"
            >
              Register Now
            </Link>{" "}
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-1">
          <label className="text-md mt-2 mb-2">Email</label>
          <input
            className="border border-base-300 py-2 pl-4 rounded-md outline-0"
            type="email"
            required
            name="email"
            placeholder="mariamsawrana@gmail.com"
          />

          <label className="text-md mt-2 mb-2">Password</label>

          <div className="relative">
            <input
              className="w-full border border-base-300 py-2 pl-4 pr-10 rounded-md outline-0"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Type a strong password"
            />

            <LuEyeClosed
              onClick={() => SetshowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            />
          </div>

          <button
            type="submit"
            className=" rounded-md bg-linear-to-r from-[#7024e8] to-[#a45cf0] py-2 px-4 font-semibold mt-5 text-white  cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-3 mt-8">
          <div className="h-px flex-1 bg-gray-400"></div>

          <span className="font-semibold text-black">OR</span>

          <div className="h-px flex-1 bg-gray-400"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className=" w-full mt-5 btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
