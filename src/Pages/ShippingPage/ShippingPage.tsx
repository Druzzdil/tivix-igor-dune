import React from 'react';

import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const FormContainer = styled.div`
  flex: 2;
  padding: 2rem;
  background-color: #1f2137;
  color: white;
`;

const ImageContainer = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
`;

const FormTitle = styled.h1`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  flex: 1;
`;

const HalfInput = styled(Input)`
  flex: 0.5;
`;

const  ShippingDetailsPage = () => {
    return (
        <PageContainer>
            <FormContainer>
                <FormTitle>SHIPPING DETAILS</FormTitle>
                <FormGroup>
                    <HalfInput type="text" placeholder="Name" />
                    <HalfInput type="text" placeholder="Surname" />
                </FormGroup>
                <Input type="tel" placeholder="Phone Number" />
                <Input type="email" placeholder="Email" />
                <Input type="date" placeholder="Date of Birth" />
                <Input type="text" placeholder="Address" />
                <Input type="text" placeholder="City" />
                <FormGroup>
                    <HalfInput type="text" placeholder="State" />
                    <HalfInput type="text" placeholder="Zip Code" />
                </FormGroup>
            </FormContainer>
            <ImageContainer style={{backgroundImage: 'url(ADRES_URL_OBRAZKA)'}}></ImageContainer>
        </PageContainer>
    );
}

export default ShippingDetailsPage;
