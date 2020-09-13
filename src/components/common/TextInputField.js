import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

const TextInputField = ({ label, content, error, onChange, ...props }) => (
  <TextField
    required
    autoComplete='off'
    variant='outlined'
    label={label}
    type='text'
    margin='normal'
    fullWidth
    multiline
    InputLabelProps={{ shrink: true }}
    error={error}
    onChange={onChange}
    value={content}
    {...props}
  />
);

TextInputField.defaultProps = {
  error: false,
  content: '',
};
TextInputField.propTypes = {
  error: PropTypes.bool,
  content: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInputField;
