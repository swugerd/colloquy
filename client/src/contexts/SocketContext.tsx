import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

// сделать ререндер инстанса сокета при изменении isAuth

export const socket = io(`${process.env.REACT_APP_HOSTNAME}`);
export const SocketContext = createContext<Socket>(socket);
export const SocketProvider = SocketContext.Provider;
