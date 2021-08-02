import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';

import { IBookingTime } from '../../interfaces';

interface IBookModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (arg: string, arg1: string) => void;
  bookingTimes: IBookingTime[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  error: {
    margin: '8px',
  },
}));

const BookModal = ({
  open, onClose, onSubmit, bookingTimes,
}: IBookModal) => {
  const classes = useStyles();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (open) {
      setStartTime('');
      setEndTime('');
      setError('');
    }
  }, [open]);

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      onClose();
      return;
    }

    const _startTime = new Date(startTime).getTime();
    const _endTime = new Date(endTime).getTime();

    if (_startTime < new Date().getTime()) {
      setError('Choose a start time after now!');
      return;
    }

    const isOverlap = bookingTimes.find((book: IBookingTime) => {
      const bookStart = new Date(book.start).getTime();
      const bookEnd = new Date(book.end).getTime();

      if (
        (bookStart <= _startTime && _startTime < bookEnd)
        || (bookStart < _endTime && _endTime <= bookEnd)
      ) {
        return true;
      }

      return false;
    });

    if (isOverlap) {
      setError('This overlaps!');
      return;
    }

    onSubmit(startTime, endTime);
    onClose();
  };

  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  return (
    <Dialog
      className={classes.container}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Book a new meeting</DialogTitle>
      <DialogContent>
        <Grid container justifyContent="space-around">
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <TextField
                id="datetime-start"
                label="Start time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={startTime}
                onChange={handleChangeStart}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="datetime-end"
                label="End time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={endTime}
                onChange={handleChangeEnd}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography color="error" className={classes.error}>
          {error}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
