import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { IRoom } from '../../interfaces';
import { Context } from './context';

export { useRooms } from './context';

interface Props {
  children: React.ReactNode;
}

export const RoomProvider: React.FC<Props> = ({ children }: Props) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [filterRoom, setFilterRoom] = useState<number>(-1);
  const [filterPPL, setFilterPPL] = useState<number>(-1);
  const [filterStartTime, setFilterStartTime] = useState<string>('');
  const [filterEndTime, setFilterEndTime] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/data.json');
      setRooms(res.data?.rooms);
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        rooms,
        filterRoom,
        filterPPL,
        filterStartTime,
        filterEndTime,
        setRooms,
        setFilterRoom,
        setFilterPPL,
        setFilterEndTime,
        setFilterStartTime,
      }}
    >
      {children}
    </Context.Provider>
  );
};
