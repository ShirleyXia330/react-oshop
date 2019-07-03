import React from "react";

const FormInput = ({ id, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <input id={id} className="form-control" {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
