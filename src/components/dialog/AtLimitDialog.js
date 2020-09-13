import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContainer from './DialogContainer';
import { AT_LIMIT_DIALOG_TITLE } from '../../constants';

const AtLimitDialog = ({ open, title, message, handleClose }) => (
  <DialogContainer open={open} title={title} handleClose={handleClose}>
    <DialogContent>
      <Typography gutterBottom>
        {message}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button color='primary' onClick={handleClose}>
        Close
      </Button>
    </DialogActions>
  </DialogContainer>
);

AtLimitDialog.defaultProps = {
  open: false,
  title: AT_LIMIT_DIALOG_TITLE,
};
AtLimitDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AtLimitDialog;
