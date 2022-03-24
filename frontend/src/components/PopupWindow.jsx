import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useHistory } from "react-router-dom";

export default function PopupWindow(props) {

  const [scroll, setScroll] = React.useState('paper');
  const [open, setOpen] = React.useState(true);
  const history = useHistory();


  function handleClose() {
    setOpen(false);
    history.push('/');
  };


  // const handleClickOpen = (scrollType) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

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