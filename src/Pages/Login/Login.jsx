
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo (2).png";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/UseAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const {setUser,setLoading}=useAuth();
  const onSubmit = async (data) => {
    const { email, pin } = data;
    try {
      const response = await axiosSecure.post("/auth/login", { email, pin });
      localStorage.setItem('access-token', response.data.token);
      setUser({ email });
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Navigating to home...");
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or PIN. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Login error:", error);
      throw error;
    }finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/t4NR5S6/wristwatch-cellphone-credit-card-blue-surface-online-shopping.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40 justify-end">
            <div className="lg:mt-20">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Pay Ease
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Pay your bills with ease and convenience with Pay Ease.Here at Pay Ease, we provide you with a platform to pay your bills with ease and convenience. Pay your bills with ease and convenience with Pay Ease.Here at Pay Ease, we provide you with a platform to pay your bills with ease and convenience.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="pin"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      PIN
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot PIN?
                    </a>
                  </div>
                  <input
                    type="password"
                    {...register("pin", { required: true })}
                    name="pin"
                    id="pin"
                    placeholder="Your PIN"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-opacity-40"
                  />
                  {errors.pin && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none">
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don’t have an account yet?
                <Link
                  to={"/signup"}
                  className="text-blue-500 focus:outline-none hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
