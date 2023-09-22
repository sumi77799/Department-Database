import React from "react";

const Tag = ({ text, key, id, ...props }) => {
  return (
    <span
      id={id ? id : null}
      key={key}
      {...props}
      className="mb-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2 hover:bg-indigo-200 cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:scale-110 hover:shadow-lg active:scale-95 active:shadow-lg"
    >
      {text}
    </span>
  );
};

export default Tag;
