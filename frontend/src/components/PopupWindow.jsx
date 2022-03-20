import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

export default function PopupWindow(props) {

  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const history = useHistory();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
    history.push('/') 
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