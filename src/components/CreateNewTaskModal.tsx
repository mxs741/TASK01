import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Alert
} from '@mui/material';
import { CreateModalProps } from '../core/types';
import { Task } from '../core/types';


const CreateNewTaskModal = ({ open, columns, onClose, onSubmit }: CreateModalProps) => {

  const [createAlert, setCreateAlert] = useState(false)
  const [values, setValues] = useState<Task>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const handleSubmit = () => {
    setCreateAlert(true)
    setTimeout(() => {
      onSubmit(values);
      onClose();
      setCreateAlert(false)
    }, 500)
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      {createAlert && <Alert severity="success">Task added!</Alert>}
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewTaskModal;