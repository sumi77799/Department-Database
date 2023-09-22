import { useState } from "react";

const TextArea = ({
  label,
  placeholder,
  defaultValue,
  value,
  name,
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
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id="message"
        name={name}
        rows={4}
        value={fieldValue}
        onChange={handleChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:outline-none focus:border-black"
        placeholder={placeholder ?? ""}
        defaultValue={defaultValue ?? ""}
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

export default TextArea;
