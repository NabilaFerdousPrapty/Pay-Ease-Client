import { useQuery } from "@tanstack/react-query";
import useAuth from './UseAuth';
import UseAxiosSecure from "./UseAxiosSecure";


const UseAdmin = () => {
    const {user}=useAuth();
    const axiosSecure=UseAxiosSecure()
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey: [user?.email,'isAdmin'],
        queryFn: async () => {
            const response=await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log(response.data);
            return response.data?.admin;
        },
    })
    return [isAdmin,isAdminLoading]
};

export default UseAdmin;