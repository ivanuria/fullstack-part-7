import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'

const Dialog = ({ title, text, onAccept, open, setOpen }) => {
  console.log("OPEN", open)
  const handleClose = () => {
    setOpen(false)
  }
  const handleAccept = () => {
    onAccept()
    setOpen(false)
  }
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`${title}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        { text }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Dismiss</Button>
        <Button onClick={handleAccept} autoFocus>
          OK
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

export default Dialog