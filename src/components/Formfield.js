// src/components/FormField.js
import React from "react";

const Formfield = ({
  label,
  type,
  name,
  value,
  options,
  onChange,
  onBlur,
  errors,
}) => {
  if (type === "textarea") {
    return (
      <div className="form-field">
        <label>{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors && <p>{errors}</p>}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="form-field">
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange} onBlur={onBlur}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors && <p>{errors}</p>}
      </div>
    );
  }

  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && <p>{errors}</p>}
    </div>
  );
};

export default Formfield;
