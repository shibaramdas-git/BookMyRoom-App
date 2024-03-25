import React from "react";
import { Link } from 'react-router-dom'

export default function Landingscreen() {
  return (
    <div className="h-screen bg-gradient-to-tr from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-gray-950 bg-opacity-80 py-8">
        <div className="text-[50px] text-white text-center mt-[60px]">
          BookMyRoom
        </div>
        <div className="text-white text-[22px] text-center px-8 w-2/3 mx-auto py-4">
        Cheapest Deals on Budget & Luxury Hotels are Available at BookMyRoom
        </div>
        <div className="flex justify-center p-4">
          <Link to='/home' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Get started 
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
