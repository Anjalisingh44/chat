import React from 'react';
import styled  from 'styled-components';
import Robot from '../assets/Robot.gif';



function Welcome({currentUser}) {
  return (

    <Container>
        <img src={Robot} alt="Robot" />
        <h2>
            Welcome,<span>{currentUser.username}</span>
        </h2>
        <h3>Please select a chat to  start messaging </h3>
    </Container>
  )
}
const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
color:black;
 background-color: white;
img{
height: 20rem;




}
span{
color:black;
}
`;
export default Welcome