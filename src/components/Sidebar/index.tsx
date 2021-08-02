import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { ROOM_TYPES, ROOM_PPL_TYPES } from '../../constants';
import { useRooms } from '../../provider';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 50,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
    marginTop: 50,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const {
    filterRoom,
    filterPPL,
    filterStartTime,
    filterEndTime,
    setFilterRoom,
    setFilterPPL,
    setFilterStartTime,
    setFilterEndTime,
  } = useRooms();

  const handleChangeRoom = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterRoom(event.target.value as number);
  };

  const handleChangePpl = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterPPL(event.target.value as number);
  };

  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStartTime(event.target.value);
  };

  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEndTime(event.target.value);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Room Type</InputLabel>
        <Select
          labelId="room-select"
          id="room-select"
          value={filterRoom}
          onChange={handleChangeRoom}
        >
          <MenuItem value={-1}>-- All --</MenuItem>
          {ROOM_TYPES.map((t: string, _i: number) => (
            <MenuItem value={_i}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <FormControl className={classes.formControl}>
        <InputLabel>Capacity</InputLabel>
        <Select
          labelId="capacity-select"
          id="capacity-select"
          value={filterPPL}
          onChange={handleChangePpl}
        >
          <MenuItem value={-1}>-- All --</MenuItem>
          {ROOM_PPL_TYPES.map((t: string, _i: number) => (
            <MenuItem value={_i}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <TextField
        id="datetime-filter-start"
        label="Start time"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={filterStartTime}
        onChange={handleChangeStart}
      />
      <TextField
        id="datetime-filter-end"
        label="End time"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={filterEndTime}
        onChange={handleChangeEnd}
      />
    </Drawer>
  );
};

export default Sidebar;
