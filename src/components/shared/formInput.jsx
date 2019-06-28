import React from "react";

const FormInput = ({ id, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} style={{ textTransform: "capitalize" }}>
        {id}
      </label>
      <input id={id} type="text" className="form-control" {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
