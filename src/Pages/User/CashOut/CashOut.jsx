import { useQuery } from '@tanstack/react-query';
import React from 'react';

const CashOut = () => {
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
    return (
        <div>
{
    agent.map((agent) => (
        <div key={agent._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div className="flex">
          <img className="h-12 w-12 rounded-full" src={agent.image} alt="" />
          <div className="ml-2">
            <p className="text-lg font-semibold text-gray-700 dark:text-white">{agent.name}</p>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{agent.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{agent.phone}</p>
        </div>
      </div>
    ))
}
            
        </div>
    );
};

export default CashOut;