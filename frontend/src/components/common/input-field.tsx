import React, { type InputHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
  ) => {
    const inputName =
      name || (rest as InputHTMLAttributes<HTMLInputElement>).name || "";

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={inputName}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={inputName}
          name={inputName}
          type={type}
          ref={ref}
          required={required}
          placeholder={placeholder}
          className={`focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...rest}
        />
        {error && <span className="text-red-500 text-xs -mt-1">{error}</span>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
