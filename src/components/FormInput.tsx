import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default FormInput;
