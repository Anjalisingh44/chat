import React from 'react';
import styled  from 'styled-components';
import Robot from '../assets/Robot.png';



function Welcome({currentUser}) {
  return (

    <Container>
        <img src={Robot} alt="Robot" />
        <h1>
            welcome,<span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to  start messaging </h3>
    </Container>
  )
}
const Container = styled.div``;
export default Welcome