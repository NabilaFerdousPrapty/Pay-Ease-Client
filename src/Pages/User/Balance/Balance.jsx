import React from 'react';
import { Link } from 'react-router-dom';

const Balance = () => {
    
    return (
        <div className='flex justify-center items-center h-[600px] w-full'>
             <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div
                className="w-full h-96  bg-center bg-cover rounded-lg shadow-md"
                style={{ backgroundImage: 'url(https://i.ibb.co/7JJPLsS/4679196-removebg-preview.png)' }}
            ></div>

            <div className="w-56 -mt-10 overflow-hidden  rounded-lg shadow-lg md:w-64 bg-[#000b76]">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">Account Balance</h3>
                <p className="py-2 font-bold text-center text-gray-800  bg-blue-300 shadow-xl">
                    $ 500
                </p>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <Link to="/cash-in">
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase  bg-[#000c76e5] rounded hover:bg-[#2b0076]  focus:outline-none">
                        Cash In
                    </button>
                    </Link>
                    <Link to="/cash-out">
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase  bg-[#000c76e5] rounded hover:bg-[#2b0076]  focus:outline-none">
                        Cash Out
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Balance;