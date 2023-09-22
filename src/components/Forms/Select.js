import React, { useState } from "react";

const Select = ({
  label,
  options,
  name,
  error,
  required,
  value,
  style,
  handlePublicationStatusChange,
  ...props
}) => {
  const newOptions = [{ label: "Select an option", value: "" }, ...options];
  const [selectedOption, setSelectedOption] = useState(
    value ?? newOptions[0].value
  );

  return (
    <div className="w-full">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        name={name}
        id="countries"
        value={selectedOption}
        required={required}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          if (handlePublicationStatusChange) {
            handlePublicationStatusChange(e.target.value);
          }
        }}
        {...props}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm ${style}`}
      >
        {newOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p
        className={`mt-1 text-xs text-red-600 dark:text-red-500 ${
          error ? "" : "invisible"
        }`}
      >
        <span className="font-medium ">Oops!</span> {error}
      </p>
    </div>
  );
};

export default Select;
