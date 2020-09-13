import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog';

const DialogContainer = ({ open, title, handleClose, children }) => (
  <Dialog fullWidth open={open} onClose={handleClose}>
    <DialogTitle style={{ paddingBottom: 0 }}>
      {title}
    </DialogTitle>
    {children}
  </Dialog>
);

DialogContainer.defaultProps = {
  open: false,
  title: '',
  children: null,
};
DialogContainer.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default DialogContainer;
