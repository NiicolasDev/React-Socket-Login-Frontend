import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'

const HomeSidebar = () => {

    const {logout} = useContext(AuthContext)
    
    return (
        <div className="box-main d-flex align-items-center justify-content-center">
            <div className="box-center d-flex align-items-center flex-column gap-5">
                <i className="fas fa-house-user icon_active"></i>
                <i className="fas fa-user icon_chat"></i>
                <i className="fas fa-cog icon_chat"></i>
            </div>
            <div className="box-end">
                <button onClick={logout} className="btn-loggoded"><i className="fas fa-power-off icon_chat"/></button>
            </div>
        </div>
    )
}

export default HomeSidebar

