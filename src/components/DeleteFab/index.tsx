import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

import './DeleteFab.scss';

type Props = {
  action: () => void;
};

function DeleteFab(props: Props) {
  const { action } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Fab
        className="deleteFab"
        onClick={() => setIsOpen(true)}
        color="primary"
      >
        <Delete />
      </Fab>
      <Dialog open={isOpen}>
        <DialogContent>Are you sure you want to delete all data?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              action();
              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteFab;
