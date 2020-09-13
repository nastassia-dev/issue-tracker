import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';

const DialogActionsContainer = ({ closeBtnTitle, confirmBtnTitle, handleClose, handleConfirm, children }) => (
  <DialogActions>
    <Button color='primary' onClick={handleClose}>
      {closeBtnTitle}
    </Button>
    {children}
    <Button color='primary' onClick={handleConfirm}>
      {confirmBtnTitle}
    </Button>
  </DialogActions>
);

DialogActionsContainer.defaultProps = {
  closeBtnTitle: 'cancel',
  confirmBtnTitle: 'save',
  children: null,
};
DialogActionsContainer.propTypes = {
  closeBtnTitle: PropTypes.string,
  confirmBtnTitle: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default DialogActionsContainer;
