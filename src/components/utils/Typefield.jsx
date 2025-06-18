import React from 'react';

const Typefield = ({ onBlur, onChange, onFocus, value, name, type, error, touched , placeholder }) => {
  // options
  if (type === 'select') {
    return (
      <div className="relative z-0 w-full mb-5 group">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label
          htmlFor={name}
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Gender
        </label>
        {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  // Regular  input
  return (
    <div className="relative z-0 w-full  mb-5 group">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder?placeholder:name.toUpperCase()[0] + name.slice(1)}
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent   border  border-[#E2E8F0] appearance-none  focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
      />
      <label
        htmlFor={null}
        className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform 
          -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
      
      </label>
      {touched && error && <p className="text-red-500 text-xs ">{error}</p>}
    </div>
  );
};

export default Typefield;
