import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://react-socket-login.herokuapp.com');

    const { auth } = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
          if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket])

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
      }
  }, [auth, desconectarSocket])

    //Mostrar los cambios de los usuarios conectados


    useEffect(() => {
        socket?.on('lista-users', (users) => {
            dispatch({
                type: types.usuariosCargados,
                payload: users
            })
        })
    }, [socket, dispatch])

    useEffect(() => {
        socket?.on('mensaje-personal', (mesagge) =>{
            //Dispatch de una acción
            dispatch({
                type: types.newMessage,
                payload: mesagge
            })
            //Movel el scroll al final
            scrollToBottomAnimated('messages')
        })
    }, [socket, dispatch])

return (
    <SocketContext.Provider value={{ socket, online }}>
        {children}
    </SocketContext.Provider>
)
}