import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

// перенести id пользователя в этот инстанс

export const socket = io(`${process.env.REACT_APP_HOSTNAME}`, { query: { userId: 1 } });
export const SocketContext = createContext<Socket>(socket);
export const SocketProvider = SocketContext.Provider;
