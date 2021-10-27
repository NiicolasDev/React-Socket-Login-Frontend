import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import ChatItem from './ChatItem'

const ChatList = () => {

    const { auth } = useContext(AuthContext)
    const { chatState } = useContext(ChatContext)

    const { users } = chatState

    return (
        <>
            <div className="container-user d-flex align-items-center mb-3">
                <span className="logo"></span>
                <h3 className="login-chat">{auth.name} {auth.apellido}</h3>
            </div>
            <hr />

            <div className="box-title d-flex align-items-center mb-1">
                <h3 className="chats-text">Chats</h3>
                <div className="number d-flex align-items-center justify-content-center">
                    <span className="number-conections">{users.length}</span>
                </div>
            </div>
            <div className="box-chats-container">
                {
                    users.filter(id => id.uid !== auth.uid).map(user => (
                        <ChatItem user={user} key={user.uid} />
                    ))
                }
            </div>
        </>
    )
}

export default ChatList
