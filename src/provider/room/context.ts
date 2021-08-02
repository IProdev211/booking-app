import { createContext, useContext } from 'react';
import { IRoom } from '../../interfaces';

export type ContextType = {
  rooms: IRoom[];
  filterRoom: number;
  filterPPL: number;
  filterStartTime: string;
  filterEndTime: string;
  setRooms: (arg: IRoom[]) => void;
  setFilterRoom: (arg: number) => void;
  setFilterPPL: (arg: number) => void;
  setFilterStartTime: (arg: string) => void;
  setFilterEndTime: (arg: string) => void;
};

export const Context = createContext<ContextType>({} as ContextType);

export const useRooms = () => {
  const context = useContext(Context);

  return context;
};
