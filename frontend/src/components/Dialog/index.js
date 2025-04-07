import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ children, title, open, isEditing, onCancelClose, onSubmit, onSave }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancelClose}
        aria-labelledby="form_dialog"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="form_dialog_title">{ title }</DialogTitle>
        <DialogContent style={{ paddingTop: '5px'}}>
          { children }
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelClose} color='error'>
            Cancelar
          </Button>
          { isEditing ? <Button onClick={onSave} color="info">Salvar</Button> : <Button onClick={onSubmit} color="primary">Cadastrar</Button> }
        </DialogActions>
      </Dialog>
    </div>
  );
}