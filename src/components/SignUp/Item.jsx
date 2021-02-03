import { Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Item({
  id,
  name,
  label,
  stateKey,
  value,
  xs,
  sm,
  autoComplete,
  helperText,
  handleChange,
  schema,
}) {
  const [isError, setIsError] = useState(false);

  const handleBlur = async () => {
    const isValid = await schema.isValid(value);
    setIsError(!isValid);
  };

  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        required
        id={id}
        name={name}
        label={label}
        value={value}
        error={isError}
        onChange={(e) =>
          handleChange((state) => ({ ...state, [stateKey]: e.target.value }))
        }
        fullWidth
        autoComplete={autoComplete}
        helperText={helperText}
        onBlur={handleBlur}
      />
    </Grid>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  stateKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  xs: PropTypes.string.isRequired,
  sm: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  schema: PropTypes.node.isRequired,
};
