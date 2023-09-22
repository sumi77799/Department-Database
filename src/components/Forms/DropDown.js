import { useState } from "react";

const Dropdown = ({ isOpened, searchItems, onClick, isDepartment }) => {
  // console.log("isDepartment value", isDepartment);
  return (
    <div
      className={`z-50 ${
        isOpened ? "absolute" : "hidden"
      } w-96 h-auto overflow-y-auto max-h-52
      my-4 text-base list-none bg-white divide-y divide-background-100 rounded shadow-md bg-background-100`}
      id="dropdown-user"
    >
      {/* Search items */}
      <ul className="py-1" role="none">
        {searchItems.map((item) => (
          <li key={item["id"]}>
            <button
              type="button"
              className="w-full text-left flex pl-4 py-2 text-base text-primary-400 hover:bg-primary-100  dark:hover:text-white"
              onClick={() => onClick(item)}
            >
              <span className="flex-1">
                {isDepartment ? item.name : item.first_name}
              </span>

              {!isDepartment && (
                <span className="text-sm text-gray-400 flex-1">
                  {item.email ?? ""}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
