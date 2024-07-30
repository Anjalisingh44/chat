import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
   const [isloaded,setIsloaded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      } else {
        try{
        setCurrentUser(JSON.parse(user));
        setIsloaded(true);
        }
        catch (error) {
          console.error('Error parsing user data:', error);
          // Handle error when parsing user data
        }
      }
    };
    checkUser();
  }, [navigate]);
  useEffect(()=>{
    if(currentUser){
      socket.current =io("http://localhost:5000")
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.isAvatarImageSet) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/getallusers/${currentUser._id}`);
          if (response.ok) {
            const data = await response.json();
            setContacts(data);
          } else {
            const errorData = await response.json();
            console.error('Error fetching contacts:', errorData);
            throw new Error('Failed to fetch contacts');
          }
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      } else if (currentUser && !currentUser.isAvatarImageSet) {
        navigate('/setAvatar');
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        { isloaded && currentChat === undefined && currentUser ? (
          <Welcome currentUser={currentUser} />
        ) : (

         <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

     
const Container = styled.div`
 
height: 100vh;
width: 100vw;
display:flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color:	#ADD8E6;
.container{
height:85vh;
width:85vw;
background-color:#2E5A88;
 display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
}



`;

export default Chat
