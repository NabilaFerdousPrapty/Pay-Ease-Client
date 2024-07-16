import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Fetch all users on component mount
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users based on search term
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleApprove = async (email, isAgent) => {
        try {
            const url = isAgent ? `/users/agent/approve/${email}` : `/users/approve/${email}`;
            await axios.patch(url);
            setUsers(prevUsers => prevUsers.map(user => (user.email === email ? { ...user, status: 'approved' } : user)));
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleReject = async (email, isAgent) => {
        try {
            const url = isAgent ? `/users/agent/reject/${email}` : `/users/reject/${email}`;
            await axios.patch(url);
            setUsers(prevUsers => prevUsers.map(user => (user.email === email ? { ...user, status: 'rejected' } : user)));
        } catch (error) {
            console.error('Error rejecting user:', error);
        }
    };

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.email}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.AppliedAs}</td>
                            <td>
                                {user.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(user.email, user.AppliedAs === 'Agent')}>Approve</button>
                                        <button onClick={() => handleReject(user.email, user.AppliedAs === 'Agent')}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
