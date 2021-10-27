import React,{ useContext } from 'react'
import '../assets/css/chat.css'
import ChatList from '../components/ChatList'
import ChatSelect from '../components/ChatSelect'
import HomeSidebar from '../components/HomeSidebar'
import MessagesChat from '../components/MessagesChat'
import SearchBox from '../components/SearchBox'
import { ChatContext } from '../context/chat/ChatContext'

const ChatPage = () => {

    const {chatState} = useContext(ChatContext)

    return (
        <>
            <div className="container-fluid bg">
                <div className="row">
                    <div className="col-2 container-mega-main d-flex align-items-center justify-content-center">
                        <HomeSidebar />
                    </div>
                    <div className="col-4 container-chat">
                        <ChatList />
                    </div>
                    <div className="col-4 container-mesages">
                        <div className="messaging">
                            {
                                (chatState.chatActivo)
                                ?  <> <SearchBox/><MessagesChat/>  </>
                                :  <ChatSelect/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
