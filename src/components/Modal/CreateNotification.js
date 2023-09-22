import React from "react";
import InputFull from "../Forms/InputFull";
import Select from "../Forms/Select";
import { useSpring, animated, config } from "react-spring";

const CreateNotification = ({
  title,
  handleSubmit,
  isModalOpen,
  setIsModalOpen,
}) => {
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
      className={`fixed top-0 left-1/3 z-50  w-full p-4 overflow-x-hidden overflow-y-auto max-h-full outline-none focus:outline-none ${
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
              {/* notification, message, group, redirect_link */}
              <InputFull
                label="Notification Title"
                type="text"
                name="notification"
                id="notification"
                placeholder="Enter Notification"
                style={"bg-white"}
                required
              />

              <InputFull
                label="Message"
                type="text"
                name="message"
                id="message"
                placeholder="Enter Message"
                style={"bg-white"}
                required
              />

              <Select
                label="Group"
                options={[
                  { value: "Student", label: "Student" },
                  { value: "Staff", label: "Staff" },
                  { value: "Faculty", label: "Faculty" },
                  { value: "All", label: "All" },
                ]}
                name={"group"}
                required
              />

              <InputFull
                label="Redirect Link"
                type="text"
                name="redirect_link"
                id="redirect_link"
                placeholder="Enter Redirect Link e.g. https://www.google.com"
                style={"bg-white"}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send Notification
              </button>
            </form>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default CreateNotification;
