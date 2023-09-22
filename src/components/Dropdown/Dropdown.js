import React from "react";

const Dropdown = ({ isOpened, user, topNavItems }) => {
  return (
    <div
      className={`z-50 ${
        !isOpened ? "absolute" : "hidden"
      } my-4 top-10 right-5 text-base list-none bg-white divide-y divide-background-800 rounded shadow`}
      id="dropdown-user"
    >
      <div className="px-4 py-3" role="none">
        <p className="text-base text-primary-400 dark:text-white" role="none">
          {user.name}
        </p>
        <p
          className="text-base font-medium text-primary-400 truncate"
          role="none"
        >
          {user.email}
        </p>
      </div>
      {/* Top Navigation */}
      <ul className="py-1" role="none">
        {topNavItems.map((item) => (
          <li key={item.name}>
            <button
              className="w-full text-left block pl-4 py-2 text-base text-primary-400 hover:bg-primary-100  dark:hover:text-white"
              onClick={item.onClickFunction}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
