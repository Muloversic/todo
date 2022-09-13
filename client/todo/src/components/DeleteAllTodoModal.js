import React from 'react'
import { withStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import { Box, Typography, Button, ButtonGroup, InputBase } from '@mui/material'

function DeleteAllTodoModal({
  handleDelete,
  handleClose,
  open,
  handleInputChange,
  inputValue,
  error,
  classes,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.heading}>
          Type &quot;delete&quot; to delete all todos
        </Typography>
        <InputBase
          className={classes.input}
          onChange={handleInputChange}
          value={inputValue}
          error={error}
        />
        <ButtonGroup aria-label="outlined primary button group" className={classes.buttonGroup}>
          <Button variant="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="delete" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  )
}

const styles = (theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.modal.main,
    width: 400,
    padding: 10,
    borderRadius: 5,
  },
  heading: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex !important',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: '20em',
    border: `1px solid ${theme.palette.common.white}`,
    marginTop: '10px',
    padding: '5px',
    color: `${theme.palette.common.white} !important`,
    borderRadius: 5,
  },
})

export default withStyles(styles, { withTheme: true })(DeleteAllTodoModal)
