import React from 'react'
import { horaMes } from '../helpers/horaMes'

const ReceivedMessages = ({ msg }) => {

    

    return (
        <>
            <div className="incoming_msg">
                <div className="incoming_msg_img">
                    {/* <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> */}
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{msg.mensaje}</p>
                        <h5 className="time_date">{horaMes(msg.createdAt)}</h5>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReceivedMessages
