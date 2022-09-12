import React from 'react'
import { withStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

function TodoModal({ handleDelete, handleClose, open, title, classes }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.heading}>
          {title}
        </Typography>
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
  },
  buttonGroup: {
    display: 'flex !important',
    justifyContent: 'space-between',
  },
})

export default withStyles(styles, { withTheme: true })(TodoModal)
