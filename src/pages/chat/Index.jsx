import React, { useState, useRef, useEffect } from 'react';
import './Index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useAccessChatMutation, useFetchMessagesMutation, useGetChatsQuery, useMessageSendMutation } from '../../api';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getSocket } from '../../socketConnection/socketIo';

  const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedChat, setSelectedChat] = useState({})
  const messageListRef = useRef(null);
  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.authReducer.activeUser);
  let socket = getSocket()
  const { data : chatData, isLoading, refetch } = useGetChatsQuery(user._id)
  const [chatAcess, resp] = useAccessChatMutation()
  const [getMessages, response] = useFetchMessagesMutation()
  const [sendMessage, respSendmsg] = useMessageSendMutation()

   const selectedChatRef = useRef(selectedChat); 
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSelectedchat = (selectChatData) => {
    let chatId = selectChatData._id
    let selecteduserName = user._id === selectChatData.user[0]._id ? selectChatData.user[1].name : selectChatData.user[0].name
    let userId = user._id === selectChatData.user[0]._id ? selectChatData.user[1]._id : selectChatData.user[0]._id
    setSelectedChat({ chatId, selecteduserName, userId })
    refetch()
  }

  const handlefetchMessage = () => {
    if (params.id !== 'null') {
      let payload = { chatId: params.id, _id: user._id }
      getMessages(payload)
    }
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '' ) {
      const payload = { content: inputText, chatId: params.id, senderId: user._id }
      sendMessage(payload)

    }
  };

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
 

  useEffect(() => {
    selectedChatRef.current = selectedChat; 
  }, [selectedChat]);
  
  useEffect(() => {
    if (socket) {
      socket.on('messagerecieved', (getData) => {
  
        if (getData.message.chat._id === selectedChatRef.current?.chatId) {
          console.log("portion 1");
          handlefetchMessage();
        } else {
          console.log("portion 2");
          refetch();
        }
      });
    }
  }, [socket]);
  


  useEffect(() => {
    if (response?.error) {
      toast.error(response?.error?.data?.error);
    } else if (response?.data) {
      setMessages(response?.data.messages)
    }
  }, [response]);

  useEffect(() => {
    if (respSendmsg?.error) {
      toast.error(respSendmsg?.error?.data?.error);
    } else if (respSendmsg?.data) {
      socket.emit("new-message", respSendmsg?.data, selectedChat);
      let payload = { chatId: params.id, _id: user._id }
      params.id != null && getMessages(payload)
      setInputText("")
    }
  }, [respSendmsg]);


  useEffect(() => {
    if (resp?.error) {
      toast.error(resp?.error?.data?.error);
    } else if (resp?.data) {
      handleSelectedchat(resp?.data.chat)
    }
  }, [resp]);


  useEffect(() => {
    handlefetchMessage()
  }, [params])

  useEffect(() => {
    if (params.id !== 'null') {
    let payload2 = { _id: params.id }
      chatAcess(payload2)
    }
  }, [params])
  

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="container border">
      <div className='row'>
        <div className='col-md-4'>
          <h1 className="mt-4">Chat</h1>
        </div>
        <div className='col-md-8'>
          <h4 className="mt-4">{selectedChat?.selecteduserName && capitalizeFirstLetter(selectedChat.selecteduserName)}</h4>

        </div>
      </div>
      <div className="row ">
        <div className="col-md-4 border">
          <div className='chat-container ' style={{ height: '400px', overflowY: 'auto' }} >
            {isLoading ? <p>loading..</p> : chatData?.data.length > 0 && chatData?.data.map((list, index) => (
              <div className='mt-2 chathistoryid' onClick={() => { user.status === "teacher" ? navigate(`/chat/${list._id}`) : navigate(`/chats/${list._id}`); handleSelectedchat(list) }} >
                {list.unreadCount !== 0 && <span className="unread-badge">{list.unreadCount}</span>}
                <div key={index} className="message mb-3">
                  <h5>{user._id === list.user[0]._id ? list.user[1].name : list.user[0].name}</h5>
                  <p>{list.latestMessage}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="col-md-8 border">
          <div className="chat-container">
            <div className="chat-messages">
              {/* <h2 className="mb-4">Chat Messages</h2> */}
              <div className="message-list" style={{ height: '400px', overflowY: 'auto' }} ref={messageListRef}>
                {messages.length > 0 && messages.map((item, index) => {
                  var setDate = new Date(item.createdAt)
                  return (
                    <div className={item.senderId === user._id && `message-position`}>

                      <div key={index} className="messagediv lh-1 mb-3" style={item.senderId === user._id ? { backgroundColor: "green" } : {}}>
                        <p className='message-content'> {item.content}</p>
                        <time className="message-time">
                          {setDate
                            ? setDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", })
                            : "N/A"}
                        </time>
                      </div>
                    </div>

                  )
                })}
              </div>
            </div>
          <form className="chat-input d-flex justify-content-center " onSubmit={handleSendMessage}>
              <input
              disabled={isObjectEmpty(selectedChat)}
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="form-control mt-3"
                placeholder="Type your message..."
              />
              <button type="submit" disabled={respSendmsg.isLoading} className="btn btn-primary mt-3">{respSendmsg.isLoading ? "sending.." : "Send"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
