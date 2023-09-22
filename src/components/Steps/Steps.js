import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";

const doneSVG = (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-green-500 dark:text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const currentSVG = (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-yellow-500 dark:text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.828 10.828a.5.5 0 00-.828.354v2a.5.5 0 00.5.5h2a.5.5 0 000-1h-1.293l1.146-1.146a.5.5 0 00-.354-.854H8.975z"
      clipRule="evenodd"
    />
  </svg>
);

const todoSVG = (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-gray-500 dark:text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 11a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1zm0-3a1 1 0 011-1h6a1 1 0 010 2H10a1 1 0 01-1-1zm0-3a1 1 0 011-1h6a1 1 0 010 2H10a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const Steps = ({ steps, handleStepClick, activeStep }) => {
  return (
    <ol className="relative  text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps &&
        steps.map((step, index) => (
          <li
            className={`mb-10 ml-6 ${activeStep === index ? "font-bold" : ""}`}
            key={step.title}
            onClick={() => handleStepClick(index)}
            style={{ cursor: "pointer" }}
          >
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              {/* step.icon based on step.status */}
              {step.status === "done" && (
                <FaCheck className="text-green-500 dark:text-green-400" />
              )}
              {step.status === "current" && (
                <BsCircleFill className="small-ping text-yellow-500 dark:text-yellow-400" />
              )}
              {/* {step.status === "current" && (
                <BsCircleFill className="absolute text-yellow-500 dark:text-yellow-400" />
              )} */}
              {step.status === "todo" && (
                <MdRadioButtonUnchecked className="text-gray-500 dark:text-gray-400" />
              )}
            </span>
            <h3 className="leading-tight">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </li>
        ))}
    </ol>
  );
};

export default Steps;
