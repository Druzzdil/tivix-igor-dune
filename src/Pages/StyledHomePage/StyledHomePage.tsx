
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1f2137;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const LetsGoButton = styled.button`
  background: #018dec;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease;
  border-radius: 30px;
  padding: 15px;

  &:hover {
    opacity: 0.7;
  }
`;

function StyledHomePage() {
    const navigate = useNavigate();

    return (
        <HomePageContainer>
            <Title>Lego Minifig Mystery Box</Title>
            <LetsGoButton onClick={() => navigate('/draw-result')}>Let's Go!</LetsGoButton>
        </HomePageContainer>
    );
}

export default StyledHomePage;
