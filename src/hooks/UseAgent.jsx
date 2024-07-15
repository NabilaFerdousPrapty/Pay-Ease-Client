import { useQuery } from "@tanstack/react-query";
import useAuth from './UseAuth';
import UseAxiosSecure from "./UseAxiosSecure";


const UseAgent = () => {
    const {user}=useAuth();
    const axiosSecure=UseAxiosSecure()
    const {data:isAgent,isPending:isAgentLoading}=useQuery({
        queryKey: [user?.email,'isAgent'],
        queryFn: async () => {
            const response=await axiosSecure.get(`/users/agent/${user.email}`)
            // console.log(response.data);
            return response.data?.agent;
        },
    })
    return [isAgent,isAgentLoading]
};

export default UseAgent;