import { useState } from "react";

const FloatingLabelInput = ({disabled, type, label, value, onChange, field }) => {
  const [hasContent, setHasContent] = useState(value !== "");

  const handleInputChange = (e) => {
    setHasContent(e.target.value !== "");
    onChange(field, e.target.value);
  };


  return (
    <div className="relative w-full">
      <div className="relative">
        <input
        disabled={disabled}
          type={type}
          field={field}
          value={value}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full mb-4 peer focus:border-indigo-600 bg-inherit"
        />
        <label className={`absolute left-0  top-2 px-2 ml-2 uppercase tracking-wide duration-200 
            peer-focus:text-black peer-focus:text-sm peer-focus:-translate-y-5 bg-white 
            peer-focus:font-semibold ${hasContent ? 'text-black text-sm -translate-y-5 font-semibold' : 'text-gray-400'}`}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default FloatingLabelInput;
