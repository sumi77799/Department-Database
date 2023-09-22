import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Filter = ({ text, style, onClick }) => {
  return (
    // <button
    //   type="button"
    //   className={`flex items-center py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-primary-400 focus:outline-none bg-primary-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
    //     style ?? ""
    //   }`}
    // >
    <button
      type="button"
      className={`flex items-center py-1 px-2 mr-2 mt-2 text-xs font-medium text-primary-400 focus:outline-none bg-primary-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
        style ?? ""
      }`}
    >
      {text}
      {/* animation to raotate and sclade */}
      <AiOutlineClose
        onClick={onClick}
        className="ml-2 transform transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-180"
      />
    </button>
  );
};

export default Filter;
