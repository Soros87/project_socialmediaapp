import React from "react";

const TextInput = ({
  type,
  placeholder,
  styles,
  label,
  labelStyles,
  name,
  onChange,
  required,
}) => {
  return (
    <div className="w-full flex flex-col mt-2">
      {label && (
        <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
      )}
      <div>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`w-full bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]${styles}`}
          required={required}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
