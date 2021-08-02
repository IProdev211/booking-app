import React from 'react';

import { RoomProvider } from './room';

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }: Props) => (
  <RoomProvider>{children}</RoomProvider>
);

export { useRooms } from './room';
