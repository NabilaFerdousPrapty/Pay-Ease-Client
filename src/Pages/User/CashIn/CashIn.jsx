import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const CashIn = () => {
  const axiosSecure = UseAxiosSecure();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setEmail(data.email);
  };

  const { data: agent = [], isLoading, error, refetch } = useQuery({
    queryKey: ["agent", email],
    queryFn: async () => {
      if (email) {
        const { data } = await axiosSecure.get(`/cashIn/agent/${email}`);
        return data;
      }
      return [];
    },
    enabled: !!email, 
  });

  useEffect(() => {
    if (email) {
      refetch();
    }
  }, [email, refetch]);
  console.log(agent);

  return (
    <div>
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Cash-In to Your Account
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Use the form below to find an agent and cash in to your account
            securely.
          </p>
          <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row"
            >
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter agent's email address"
                className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
              <button
                type="submit"
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
              >
                Search Agent
              </button>
            </form>
          </div>
        </div>
        {isLoading &&  <div className="flex items-center justify-center w-full h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          }
        {error && <p className="text-red-500">{error.message}</p>}

        {/* {agent.length > 0 && agent.map((agent,index) => (
          <div key={index}  className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div
              className="w-full h-96 bg-center bg-cover rounded-lg shadow-md"
              style={{ backgroundImage: `url(${agent.image})` }}
            ></div>
            <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-[#000b76]">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                Agent Details
              </h3>
              <p className="py-2 font-bold text-center text-gray-800 bg-blue-300 shadow-xl">
                {agent.name}
              </p>
              <p className="py-2 font-bold text-center text-gray-800 bg-blue-300 shadow-xl">
                {agent.email}
              </p>
              <p className="py-2 font-bold text-center text-gray-800 bg-blue-300 shadow-xl">
                {agent.phone}
              </p>
              <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase bg-[#000c76e5] rounded hover:bg-[#2b0076] focus:outline-none">
                  Cash In
                </button>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CashIn;
