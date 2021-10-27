import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { SocketContext } from '../context/SocketContext'
import OutgoingMessages from './OutgoingMessages'
import ReceivedMessages from './ReceivedMessages'

const MessagesChat = () => {

    const { chatState } = useContext(ChatContext)
    const { socket } = useContext(SocketContext)
    const { auth } = useContext(AuthContext)


    const { users } = chatState
    const { chatActivo } = chatState

    const [mesagge, setMessage] = useState('')

    const onChange = (e) => {

        setMessage(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (mesagge.length === 0) { return; }
        setMessage('');

        // Emitir un evento de sockects para enviar el mensaje
        /* {
            de: //UID del usario enviadno el mensaje
            para: // UID del usuario que recibe el mensaje
            mensaje: // lo que quiero enviar
        } */
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje: mesagge,
        })

    }
    return (
        <div className="inbox_msg">
            <div className="mesgs">
                {
                    users.map(user => {
                        if (chatActivo === user.uid) {
                            /*  console.log(user) */
                            return true
                        } else {
                            return false
                        }
                    })
                }

                <div className="msg_history" id="messages">
                 
                    {/* <h3 className="mb-4">{users.nombre}Nombre</h3> */}
                    {
                        chatState.mesagges.map(msg => (
                            (msg.para === auth.uid)
                            ? <ReceivedMessages key={msg._id} msg={msg} />
                            : <OutgoingMessages key={msg._id} msg={msg}/>
                        ))
                    }
                </div>

                <form onSubmit={onSubmit}>
                    <div className="type_msg row">

                        <div className="input_msg_write col-sm-9">
                            <input
                                type="text"
                                className="write_msg"
                                placeholder="Mensaje..."
                                value={mesagge}
                                onChange={onChange}
                            />

                        </div>
                        <div className="col-sm-3 text-center">
                            <button className="msg_send_btn mt-2" type="submit">
                                Send <i className="fas fa-paper-plane" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MessagesChat
