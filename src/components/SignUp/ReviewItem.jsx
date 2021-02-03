import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function ReviewItem({ id, name, label, value, xs, sm }) {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        InputProps={{ readOnly: true }}
        id={id}
        name={name}
        label={label}
        value={value}
        fullWidth
        autoComplete="given-name"
        size="small"
      />
    </Grid>
  );
}
ReviewItem.defaultProps = {
  sm: undefined,
};
ReviewItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  xs: PropTypes.string.isRequired,
  sm: PropTypes.string,
};
