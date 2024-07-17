import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosCommon from "../../hooks/UseAxiosCommon";


const SignUp = () => {
  const regex = /^\d{5}$/;
  const axiosCommon=UseAxiosCommon();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate();
  const [userType, setUserType] = useState('User');
  const [loading, setLoading] = useState(false);


 
  const onSubmit = (data) => {
    setLoading(true);
    const { name, email, phone, pin, confirm } = data;  
    if (pin !== confirm) {
      Swal.fire({
        title: "Your password does not match with confirm password",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      return;
    }
    if (!regex.test(pin)) {
      Swal.fire({
        title: "Your PIN must be 5 digits",
        text: "Please enter a valid PIN",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWWXENQs_TyDkT-HTgLxZAu_IXfG8397ud_w&s",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }
    
    axiosCommon.post('/auth/register', { name, email, phone, pin, userType })
  .then(response => {
    Swal.fire('Success!', 'Your account has been created.', 'success');
    navigate('/login'); // Redirect to login page or desired path
  })
  .catch(error => {
    Swal.fire('Error!', error.response?.data?.message || 'Something went wrong', 'error');
  });
  setLoading(false);


  
  }
  return (
    <div>
      <section >
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover bg-center lg:block lg:w-[45%]"
           style={{
              backgroundImage:
                "url(https://i.ibb.co/TgfFzFv/representation-user-experience-interface-design-smartphone.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center center",

           }}
          ></div>

          <div className="flex flex-col items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-[55%]">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Get your free account now.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <div className="mt-6">
                <h1 className="text-gray-500 dark:text-gray-300">
                  Select type of account
                </h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2 justify-between gap-6"> 
                  <button onClick={() => setUserType('Agent')}
                  className={`w-full flex justify-center items-center px-6 py-3 rounded-lg ${userType === 'Agent' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">
                      Agent 
                    </span>
                  </button>

                  <button  onClick={() => setUserType('User')}
                  className={`w-full flex justify-center items-center px-6 py-3 rounded-lg ${userType === 'User' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="mx-2">
                      User

                      </span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 ">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("name", { required: true })}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

               

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Phone number
                  </label>
                  <input
                    type="number"
                    {...register("phone", {
                      required: true,
                      validate: value => /^\d{11}$/.test(value) || 'Phone number must be 11 digits'
                    })}
                    placeholder="XXX-XX-XXXX-XXX"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {
                    errors.phone && (
                      <span className="text-red-500">
                        Phone number must be 11 digits
                      </span>
                    )
                  }
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {
                    errors.email && (
                      <span className="text-red-500">This field is required</span>
                    )
                  }
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    PIN
                  </label>
                  <input
                    type="password"
                    {...register("pin", { required: true })}
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {
                    errors.pin && (
                      <span className="text-red-500">This field is required</span>
                    )
                  }
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Confirm PIN
                  </label>
                  <input
                    type="password"
                    {...register("confirm", { required: true })}
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {
                    errors.confirm && (
                      <span className="text-red-500">This field is required</span>
                    )
                  }
                </div>

                <button disabled={loading} className={`flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                  <span>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                     </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <p className="my-3">
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-500 focus:outline-none focus:underline hover:underline">
          Sign in
        </Link>
      </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default SignUp;
