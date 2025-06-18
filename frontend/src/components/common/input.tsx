import React from "react";

type InputProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      required = false,
      error,
      type = "text",
      placeholder,
      ...rest
    },
    ref
  ) => (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  )
);

InputField.displayName = "InputField";

export default InputField;
