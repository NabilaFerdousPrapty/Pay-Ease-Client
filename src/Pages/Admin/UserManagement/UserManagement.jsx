import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  const approveUser = async (email) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure you want to approve?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Approve",
            denyButtonText: `Don't Approve`,
        });

        if (result.isConfirmed) {
            const response = await axiosSecure.patch(`/users/approve/${email}`);
            refetch();
            console.log("User approved:", response.data);
            Swal.fire('User Approved', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('User is not Approved', '', 'info');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Approval Failed",
            text: "User approval failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
        });
        console.error("Error approving user:", error);
    }
};

const rejectUser = async (email) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure you want to reject this user?",
            text: "You won't be able to revert this!",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Reject",
            denyButtonText: `Don't Reject`,
        });

        if (result.isConfirmed) {
            const response = await axiosSecure.patch(`/users/reject/${email}`);
            refetch(); // Call refetch after successful rejection
            Swal.fire({
                icon: "success",
                title: "User Rejected",
                text: "User has been blocked successfully.",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log("User rejected:", response.data);
        } else if (result.isDenied) {
            Swal.fire('User is not Rejected', '', 'info');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Rejection Failed",
            text: "User blocking failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
        });
        console.error("Error rejecting user:", error);
    }
};
const authorizeAgent = async (email) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure you want to authorize this agent?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Authorize",
            denyButtonText: `Don't Authorize`,
        });

        if (result.isConfirmed) {
            const response = await axiosSecure.patch(`/users/agent/approve/${email}`);
            refetch();
            console.log("Agent authorized:", response.data);
            Swal.fire('Agent Authorized', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Agent is not Authorized', '', 'info');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Authorization Failed",
            text: "Agent authorization failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
        });
        console.error("Error authorizing agent:", error);
    }
};
const rejectAgent = async (email) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure you want to block this agent?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Block",
            denyButtonText: `Don't Block`,
        });

        if (result.isConfirmed) {
            const response = await axiosSecure.patch(`/users/agent/reject/${email}`);
            refetch();
            console.log("Agent Blocked:", response.data);
            Swal.fire('Agent Blocked', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Agent is not blocked', '', 'info');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Blocking Failed",
            text: "Agent blocking failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
        });
        console.error("Error blocking agent:", error);
    }
};



  const renderButton = (user) => {
    if (user.AppliedAs === "User" && user.status === "pending") {
      return (
        <button
          onClick={() => approveUser(user.email)}
          className="text-blue-600 dark:text-blue-400 bg-white btn"
        >
          Approve
        </button>
      );
    } else if (user.AppliedAs === "User" && user.status === "approved") {
      return (
        <button
          onClick={() => rejectUser(user.email)}
          className="text-red-600 dark:text-red-900 bg-white btn"
        >
          Block
        </button>
      );
    } else if (user.AppliedAs === "Agent" && user.status === "pending") {
      return (
        <button onClick={()=>authorizeAgent(user.email)} className="text-blue-600 dark:text-blue-400 bg-white btn">
          Authorize
        </button>
      );
    } else if (user.AppliedAs === "Agent" && user.status === "authorized") {
      return (
        <button onClick={()=>rejectAgent(user.email)} className="text-blue-600 dark:text-blue-400 bg-white btn">
          Block
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="text-[#98BDE6]">
      <h1 className="text-3xl font-bold my-5 text-center">User Management</h1>
      {!users && isLoading && (
        <div className="flex justify-center items-center">
          <HashLoader />
        </div>
      )}
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden xl:max-w-5xl lg:max-w-3xl md:max-w-2xl overflow-x-scroll max-w-sm  border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Index
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Balance
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        User Type
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Authorize
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users &&
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.mobile}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.balance}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.status}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.AppliedAs}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {renderButton(user)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
