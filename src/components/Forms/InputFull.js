import { useState } from "react";

const InputFull = ({
  label,
  name,
  type,
  caveat,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  style,
  error,
  required,
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState(value ?? "");

  const handleChange = (e) => {
    setFieldValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor="street-address"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <p className={`mt-1 mb-2 text-xs text-gray-600 dark:text-red-500 `}>
        {caveat}
      </p>
      <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-primary-400">
        <input
          type={type ?? "text"}
          name={name}
          value={onChange ? value : fieldValue}
          onChange={onChange ?? handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          id="street-address"
          autoComplete="street-address"
          className={`pl-2 block flex-1 border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 ${
            style ? style : "bg-transparent "
          }`}
          placeholder={placeholder ?? ""}
          required={required ?? false}
          {...props}
        />
      </div>
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

export default InputFull;
