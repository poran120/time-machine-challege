import React from "react";

const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-white text-sm">{label}:</label>
      <div className="flex flex-col">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="outline-none bg-transparent border rounded-sm px-2.5 py-2.5 text-white placeholder:text-xs"
        />
        {error && <small className="text-red-500 text-xs">{error}</small>}
      </div>
    </div>
  );
};

export default CustomInput;
