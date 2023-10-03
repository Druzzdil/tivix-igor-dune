import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {API_KEY, API_URL} from '../../constants/constants';

const fetchMinifigs = () =>
    fetch(
        `${API_URL}/api/v3/lego/minifigs?${new URLSearchParams({ search: 'Hogwarts' })}`,
        {
            headers: { Authorization: `key ${API_KEY}` },
        }
    ).then((response) => response.json());

const ResultContainer = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1f2137;
  position: relative
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const MinifigTile = styled.div<MinifigTileProps>`
  position: relative;
  width: 250px;
  border: ${({ isSelected }) => (isSelected ? '3px solid darkorange' : 'none')};
  border-radius: ${({ isSelected }) => (isSelected ? '16px' : '0')};
  box-sizing: border-box;
`;


const MinifigGrid = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
`;

const MinifigImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 16px;
`;

const ProceedButton = styled.button`
  background: #018dec;
  background: ${({ disabled }) => (disabled ? 'gray' : '#018dec')};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top:16px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const StatueName = styled.h2`
  text-align: center;
  font-size:16px;
`

const Details = styled.h2`
    position: absolute;
    bottom: 10px;
    margin-left: 60px;
    color: darkorange;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:hover {
        opacity: 0.8;
    }
  font-size: 18px;
  text-align: center;
`;

const WrapperContainer = styled.div`
  background: white;
  height: 380px;
  border-radius: 16px;
`

type Minifig = {
    set_num: string;
    set_img_url: string;
    set_url: string;
    name: string;
};

type MinifigTileProps = {
    isSelected: boolean;
};

const DrawResultPage = () => {
    const [selectedMinifigID, setSelectedMinifigID] = useState<string | null>(null);
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery('minifigsData', fetchMinifigs);
    const [drawnMinifigs, setDrawnMinifigs] = useState<Minifig[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMinifig, setSelectedMinifig] = useState<Minifig | null>(null);

    useEffect(() => {
        if (data) {
            const tempDrawnMinifigs: Minifig[] = [];
            while (tempDrawnMinifigs.length < 3) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMinifig = data.results[randomIndex];
                if (!tempDrawnMinifigs.includes(randomMinifig)) {
                    tempDrawnMinifigs.push(randomMinifig);
                }
            }
            setDrawnMinifigs(tempDrawnMinifigs);
        }
    }, [data]);

    const openModal = useCallback((minifig: Minifig) => {
        console.log('Opening modal for');
        setSelectedMinifig(minifig);
        setModalIsOpen(true);
    }, []);

    const handleProceed = useCallback(() => {
        console.log(selectedMinifigID, 'selectedMinifigID');
        const minifigDetails = drawnMinifigs.find(minifig => minifig.set_num === selectedMinifigID);
        console.log(minifigDetails, 'minifigDetails')
        if (minifigDetails) {
            navigate(`/shipping?selectedMinifig=${selectedMinifigID}&setURL=${encodeURIComponent(minifigDetails.set_url)}`);
        }
    }, [navigate, selectedMinifigID, drawnMinifigs]);

    const handleSelect = useCallback((minifig: Minifig) => {
        setSelectedMinifigID(minifig.set_num);
    } , [setSelectedMinifigID]);

    const closeModal = useCallback(() => {
        setSelectedMinifig(null);
        setModalIsOpen(false);
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <a>{error.message}</a>;

    return (
        <ResultContainer>
            <Title>Choose Your Minifig</Title>
            <MinifigGrid>
                {drawnMinifigs.map(minifig => (
                    <MinifigTile
                        key={minifig.set_num}
                        onClick={() => handleSelect(minifig)}
                        isSelected={selectedMinifigID === minifig.set_num}
                    >
                        <WrapperContainer>
                            <MinifigImage src={minifig.set_img_url} alt={minifig.name} />
                            <StatueName>{minifig.name}</StatueName>
                            <Details onClick={(e) => { e.stopPropagation(); openModal(minifig); }}>
                                Show Details
                            </Details>
                        </WrapperContainer>
                    </MinifigTile>
                ))}
            </MinifigGrid>

            <ProceedButton
                disabled={!selectedMinifigID}
                onClick={handleProceed}
            >
                Proceed to Shipment
            </ProceedButton>

            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMinifig?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedMinifig?.set_img_url} alt={selectedMinifig?.name} style={{ width: '100%', marginBottom: '10px' }} />
                    <p>Set Number: {selectedMinifig?.set_num}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </ResultContainer>
    );
}

export default DrawResultPage;
