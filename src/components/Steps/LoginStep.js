import React, { useState } from "react";

const LoginStep = ({ steps, handleStepClick, activeStep }) => {
  return (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      {steps &&
        steps.map((step, index) => (
          <li
            key={step.name}
            onClick={() => handleStepClick(index)}
            className={`flex items-center  text-gray-500 dark:text-gray-400 space-x-2.5 cursor-pointer
                ${
                  activeStep === index
                    ? "text-blue-600 dark:text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }
            `}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 
                    ${
                      activeStep === index
                        ? "border-blue-600 dark:border-blue-500"
                        : "border-gray-500 dark:border-gray-400"
                    }
                `}
            >
              {index + 1}
            </span>
            <span>
              <h3 className="font-medium leading-tight">{step.name}</h3>
              <p className="text-sm">{step.description}</p>
            </span>
          </li>
        ))}
    </ol>
  );
};

export default LoginStep;
