import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const RenderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <Form.Field>
      {label && <label>{label}</label>}
      <input {...input} placeholder={label} type={type}/>
      {touched && (error && <Label basic color='red' pointing>{error}</Label>)}
    </Form.Field>
  );
};

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RenderField;