import React from 'react';
import {Redirect} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';
import "./styles/end-game-modal.scss";

function EndGameModal(props) {
  if (props.redirect) {
    return <Redirect to="/" />
  }
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <form>
        <DialogTitle className="form-dialog-title">Congratulation</DialogTitle>
        <DialogContent>
          <DialogContentText className="form-dialog-content">
            {props.title}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your name: "
            type="text"
            onChange={props.setNewScoreName}
            value={props.newScoreName}
            fullWidth
            inputProps={{
              maxLength: 20,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCloseDialog} color="primary" className="small-back-button">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={props.onSave}
            disabled={!props.newScoreName.trim().length}
            className="small-new-game-button">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EndGameModal;
