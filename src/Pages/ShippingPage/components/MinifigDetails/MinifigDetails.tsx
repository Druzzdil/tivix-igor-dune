import React, {useCallback, FC } from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";


const MinifigDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  position: relative;
  height: calc(100vh - 180px);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

const PartsList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const PartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PartImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  object-fit: cover;
`;

const PartName = styled.span`
  flex: 1;
  color: black;
`;

const SubmitButton = styled.button`
  border-radius: 30px;
  background-color: #018dec;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 15px;
  &:hover {
    background-color: #1E5B8CFF;
  }
`;

const MinifigImage = styled.img`
  width: 150px; 
  height: 200px;
  margin-bottom: 20px;
  object-fit: cover;
`;

interface Part {
    id: number;
    inv_part_id: number;
    part: {
        part_num: string;
        name: string;
        part_cat_id: number;
        part_url: string;
        part_img_url: string;
        external_ids: Record<string, string[]>;
        print_of: string | null;
    };
    color: {
        id: number;
        name: string;
        rgb: string;
        is_trans: boolean;
        external_ids: Record<string, any>;
    };
    set_num: string;
    quantity: number;
    is_spare: boolean;
    element_id: string;
    num_sets: number;
}

interface MinifigDetailsProps {
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Part[];
        minifigImageURL?: string;
    };
    minifigImage: string;
}

const MinifigDetails: FC<MinifigDetailsProps> = ({ data, minifigImage }) => {
    const navigate = useNavigate();

    const handleRedirect = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <MinifigDetailsContainer>
            <Title>Summary</Title>
            {minifigImage && <MinifigImage src={minifigImage} alt="Selected Minifigure" />}
            <PartsList>
                {data.results.map(part => (
                    <PartItem key={part.id}>
                        <PartImage src={part.part.part_img_url} alt={part.part.name} />
                        <PartName>{part.part.name}</PartName>
                    </PartItem>
                ))}
            </PartsList>
            <SubmitButton type="submit" onClick={handleRedirect}>Submit</SubmitButton>
        </MinifigDetailsContainer>
    );
};


export default MinifigDetails;
