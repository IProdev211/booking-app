import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import Room from '../components/Room';
import Sidebar from '../components/Sidebar';
import { useRooms } from '../provider';
import { IRoom, IBookingTime } from '../interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '80px 40px',
    display: 'flex',
    backgroundColor: '#fafafa',
    height: 'calc(100vh - 160px)',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const {
    rooms,
    filterRoom,
    filterPPL,
    filterEndTime,
    filterStartTime,
  } = useRooms();

  const displayRooms = rooms
    .filter(
      (room: IRoom) => filterRoom === -1 || (filterRoom !== -1 && room.roomType === filterRoom),
    )
    .filter(
      (room: IRoom) => filterPPL === -1 || (filterPPL !== -1 && room.pplType === filterPPL),
    )
    .filter(
      (room: IRoom) => filterStartTime === ''
        || filterEndTime === ''
        || (filterStartTime !== ''
          && filterEndTime !== ''
          && !!room.bookingTimes.find(
            (t: IBookingTime) => t.start === filterStartTime && t.end === filterEndTime,
          )),
    );

  if (displayRooms.length === 0) {
    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <Typography align="center" variant="h3">
            There is no room
          </Typography>
        </main>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Grid container spacing={5}>
          {displayRooms.map((room: IRoom) => (
            <Grid item xs={3} key={room.id}>
              <Room room={room} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default Home;
