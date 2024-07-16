import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logout from "../Pages/Logout/Logout";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const UseAxiosSecure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor to add the token
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for handling errors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const errorStatus = error?.response?.status;
                if (errorStatus === 401 || errorStatus === 403) {
                    localStorage.removeItem('access-token');
                    await Logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]);

    return axiosSecure;
};

export default UseAxiosSecure;
