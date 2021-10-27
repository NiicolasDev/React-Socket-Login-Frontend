import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchaConToken } from '../helpers/fetch'
import { scrollToBottom } from '../helpers/scrollToBottom'
import { types } from '../types/types'
const ChatItem = ({ user }) => {


    const {chatState ,dispatch} = useContext(ChatContext)
    const {chatActivo} = chatState

    const onClick = async () => {
        dispatch({
            type : types.activarChat,
            payload : user.uid
        });

        // Cargar los mensajes del chat
        const resp = await fetchaConToken(`mensajes/${user.uid}`)
        dispatch({
            type: types.cargarMessages,
            payload: resp.mensajes
        })

        //Movel el scroll
        scrollToBottom('messages')
    }
    return (
        <div className={`container-chats ${(user.uid === chatActivo) && 'active_chat' }`} onClick={onClick}>
            <div className="box-chats d-flex">
                <div className="container-photo d-flex">
                    <span className="logo"></span>
                </div>
                <div className="container-descr-profile mt-1">
                    <h3 className="name-login">{user.nombre} {user.apellido} </h3>
                    {
                        user.online
                            ?<p className="online">Online </p>
                            :<p className="offline">Offline</p>

                    }
                   {/*  <p className="msg-chats">Best Ever Vacation</p> */}
                </div>
            </div>
        </div>
    )
}

export default ChatItem
