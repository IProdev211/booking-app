import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Collapse, CardContent, Typography, Button,
} from '@material-ui/core';
import { IBookingTime } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapeContent: {
    overflow: 'auto',
    height: '200px',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: '8px 16px',
    paddingBottom: '8px !important',
  },
  bookingTimeRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    justifyContent: 'space-between',
  },
}));

interface ICollapse {
  expanded: boolean;
  bookingTimes: IBookingTime[];
  onCancel: (arg: number) => void;
}

const CardCollapse = ({ expanded, bookingTimes, onCancel }: ICollapse) => {
  const classes = useStyles();

  if (bookingTimes.length === 0) {
    return (
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.collapeContent}>
          <Typography align="center">There is no room</Typography>
        </CardContent>
      </Collapse>
    );
  }

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent className={classes.collapeContent}>
        {bookingTimes.map((time: IBookingTime, _i: number) => (
          <div className={classes.bookingTimeRow} key={time.start}>
            <Typography>{time.start}</Typography>
            <Typography>{time.end}</Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => onCancel(_i)}
            >
              Cancel
            </Button>
          </div>
        ))}
      </CardContent>
    </Collapse>
  );
};

export default CardCollapse;
