import React from 'react'
import { horaMes } from '../helpers/horaMes'

const OutgoingMessages = ({msg}) => {

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{msg.mensaje}</p>
                <h5 className="time_date">{horaMes(msg.createdAt)}</h5>
            </div>
        </div>
    )
}

export default OutgoingMessages
