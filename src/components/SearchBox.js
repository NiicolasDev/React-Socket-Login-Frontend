import React from 'react'

const SearchBox = () => {
    return (
        <div className="container-search-chat d-flex justify-content-around align-items-center">
            <form action="" className="prubea">
                <div className="wrap-input200 validate-input mb-2 d-flex align-items-center">
                    <i className="fas fa-search" />
                    <input className="input200" type="text" name="" placeholder="Looking for..." />
                    <span className="focus-input100"></span>
                </div>
            </form>
            <div className="box-icons-chat">
                <button className="btn-chat-icons"><i className="fas fa-microphone"/></button>
                <button className="btn-chat-icons"><i className="fas fa-bell"/></button>
            </div>
        </div>
    )
}

export default SearchBox
