import React from "react";

const FormSelect = ({ id, name, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <select id={id} className="form-control" {...rest}>
        <option value="">-- Select Category --</option>
        {options.map(option => (
          <option key={option._id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
