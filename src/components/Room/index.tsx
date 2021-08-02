import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import BasicImage from '../../assets/basic.jpeg';
import MultimediaImage from '../../assets/multimedia.png';
import StandupImage from '../../assets/standup.jpeg';
import CardCollapse from '../Collapse';
import BookModal from '../BookModal';
import { IRoom, IBookingTime } from '../../interfaces';
import { ROOM_TYPES, ROOM_PPL_TYPES } from '../../constants';
import { useRooms } from '../../provider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '39.25%',
  },
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
  expandLabel: {
    width: '100%',
  },
  cardContent: {
    paddingBottom: 0,
  },
}));

export default function Room({ room }: { room: IRoom }) {
  const classes = useStyles();
  const { rooms, setRooms } = useRooms();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmitBook = (startTime: string, endTime: string) => {
    const updateRooms: IRoom[] = [...rooms];
    const index: number = updateRooms.findIndex((r: IRoom) => r.id === room.id);

    const updateRoom: IRoom = {
      ...room,
      bookingTimes: [
        ...room.bookingTimes,
        {
          start: startTime,
          end: endTime,
        },
      ],
    };

    updateRooms.splice(index, 1, updateRoom);
    setRooms(updateRooms);
  };

  const handleCancelBook = (i: number) => {
    const updateRooms: IRoom[] = [...rooms];
    const index: number = updateRooms.findIndex((r: IRoom) => r.id === room.id);

    const updateRoom: IRoom = {
      ...room,
      bookingTimes: [
        ...room.bookingTimes.filter((r: IBookingTime, _i: number) => _i !== i),
      ],
    };

    updateRooms.splice(index, 1, updateRoom);
    setRooms(updateRooms);
  };

  const image = room.roomType === 0
    ? BasicImage
    : room.roomType === 1
      ? StandupImage
      : MultimediaImage;

  return (
    <Card className={classes.root}>
      <CardHeader title={room.name} />
      <CardMedia
        className={classes.media}
        image={image}
        title={ROOM_TYPES[room.roomType]}
      />
      <CardContent className={classes.cardContent}>
        <Typography>
          Room Type:
          {ROOM_TYPES[room.roomType]}
        </Typography>
        <Typography>
          Capacity:
          {ROOM_PPL_TYPES[room.pplType]}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenBookModal(true)}
        >
          Book
        </Button>
        <Typography
          align="right"
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.expandLabel}
        >
          Booking Times
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <CardCollapse
        expanded={expanded}
        bookingTimes={room.bookingTimes}
        onCancel={handleCancelBook}
      />
      <BookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
        onSubmit={handleSubmitBook}
        bookingTimes={room.bookingTimes}
      />
    </Card>
  );
}
