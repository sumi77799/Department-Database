import { useState } from "react";

const InputHalf = ({
  label,
  name,
  type,
  caveat,
  placeholder,
  value,
  error,
  required,
  style,
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState(value ?? "");

  const handleChange = (e) => {
    setFieldValue(e.target.value);
  };
  return (
    <div className="col-span-6 sm:col-span-3 w-full">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <p className={`mt-1 mb-2 text-xs text-gray-600 dark:text-red-500 `}>
        {caveat}
      </p>
      <input
        type={type ?? "text"}
        name={name}
        value={fieldValue}
        onChange={handleChange}
        id="first-name"
        autoComplete="given-name"
        placeholder={placeholder ?? ""}
        className={`focus:outline-none px-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  focus-within:ring-black sm:text-sm sm:leading-6 ${style}`}
        required={required ?? false}
        {...props}
      />
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

export default InputHalf;
