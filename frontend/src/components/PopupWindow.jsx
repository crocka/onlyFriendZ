import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material/';
import { useHistory } from "react-router-dom";

export default function PopupWindow(props) {
  const [scroll, setScroll] = useState('paper');
  const [open, setOpen] = useState(true);
  const history = useHistory();

  function handleClose() {
    setOpen(false);
    history.push('/');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      disableEnforceFocus
    >
      <DialogContent dividers={scroll === 'paper'}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}