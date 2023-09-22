import React from "react";

const ButtonPrimary = ({ type, children, style, onClick, ...props }) => {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      {...props}
      className={`text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none ${
        style ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
