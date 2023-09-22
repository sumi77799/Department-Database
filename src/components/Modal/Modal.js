import React, { useState } from "react";
import InputFull from "../Forms/InputFull";
import Datepicker from "react-tailwindcss-datepicker";
import { useSpring, animated, config } from "react-spring";

const Modal = ({ title, handleSubmit, isModalOpen, setIsModalOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const styleVisibility = useSpring({
    scale: !isModalOpen ? 0 : 1,
    opacity: !isModalOpen ? 0 : 1,
    transformOrigin: "top",
    config: config.stiff,
  });

  return (
    <animated.div
      style={styleVisibility}
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-1/3 z-50  w-full p-4 overflow-visible max-h-full outline-none focus:outline-none ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className={`relative w-full max-w-md max-h-full `}>
        {/* Modal content */}
        <div className="relative bg-background-800 rounded-lg shadow-lg dark:bg-gray-700">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* add label sayong satartdate */}
              <div className="flex flex-col ">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date
                  <span className="text-red-500"> *</span>
                </label>
              </div>
              <Datepicker
                label="Date"
                name="date"
                id="date"
                placeholder="Start Date"
                style={"bg-black"}
                useRange={false}
                asSingle={true}
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                required
              />
              <div className="flex flex-col ">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date
                  <span className="text-red-500"> *</span>
                </label>
              </div>
              <Datepicker
                label="Date"
                name="date"
                id="date"
                placeholder="End Date"
                style={"bg-black"}
                useRange={false}
                asSingle={true}
                value={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                required
              />
              <div className="hidden">
                <InputFull
                  label="Start Date"
                  type="date"
                  name="startDate"
                  id="startDate"
                  style={"bg-white"}
                  value={startDate.startDate}
                  placeholder="Start Date"
                  onChange={(newDate) => setStartDate(newDate)}
                  required
                />
                <InputFull
                  label="End Date"
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="End Date"
                  value={endDate.endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  style={"bg-white"}
                  required
                />
              </div>
              <InputFull
                label="Year"
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                style={"bg-white"}
                required
                pattern="[0-9]{4}"
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Modal;
