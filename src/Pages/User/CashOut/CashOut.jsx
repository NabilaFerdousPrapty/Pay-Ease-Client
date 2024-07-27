import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useForm } from 'react-hook-form';

const CashOut = () => {
  const axiosSecure = UseAxiosSecure();
  const [email, setEmail] = useState("");
    const { data: agent = [], isLoading, error, refetch } = useQuery({
        queryKey: ["agent", email],
        queryFn: async () => {
          if (email) {
            const { data } = await axiosSecure.get(`/cashOut/agent/${email}`);
            return data;
          }
          return [];
        },
        enabled: !!email, 
      });
     
      
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        setEmail(data.email);
      };
    return (
        <div>
            <div className="container px-6 py-16 mx-auto text-center">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                        Cash-Out from Your Account
                    </h1>
                    <p className="mt-6 text-gray-500 dark:text-gray-300">
                        Use the form below to find an agent and cash out from your account
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
                                className="w-full h-10 m-1 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                            >
                                Find Agent
                            </button>
                        </form>
                    </div>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {agent.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Agent Found
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-300">
                                Your agent is {agent[0].name} and their email address is{" "}
                                {agent[0].email}. Please contact them to cash out from your
                                account.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};

export default CashOut;