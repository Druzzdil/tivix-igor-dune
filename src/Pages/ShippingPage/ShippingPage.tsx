import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import useShippingFormik from './hooks/useInitialValues';
import { API_KEY, API_URL } from '../../constants/constants';
import MinifigDetails from './components/MinifigDetails/MinifigDetails'

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: white;
  border-radius: 30px;
`;

const FormContainer = styled.div`
  flex: 2;
  padding: 2rem;
  background-color: #1f2137;
  color: white;
`;

const DetailsContainer = styled.div`
  flex: 1;  
  background-color: white;
  overflow-y: auto;
  border-radius: 30px;
  height: calc(100vh - 180px);
`;

const FormTitle = styled.h1`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const HorizontalGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormAndDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const FormWrapper = styled.div`
  flex: 2;
  margin-right: 150px;
`;

type InputProps = {
    hasError?: boolean;
};

const Input = styled.input<InputProps>`
  padding: 0.5rem;
  flex: 1;
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  margin-bottom: 15px;
  width: 100%;
  ${(props) =>
    props.hasError &&
    css`
            background-color: #ffe5e5;
          `}
`;

const HalfInput = styled(Input)<InputProps>`
  flex: 0.5;
`;

const ShippingDetailsPage = () => {
    const formik = useShippingFormik();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMinifig = queryParams.get('selectedMinifig');

    const fetchMinifig = (set_num: string | null) =>
        fetch(`${API_URL}/api/v3/lego/minifigs/${set_num}/`, {
            headers: { Authorization: `key ${API_KEY}` }
        })
            .then(res => res.json());

    const { data: minifigData } = useQuery(
        ['minifigData', selectedMinifig],
        () => fetchMinifig(selectedMinifig),
        {
            enabled: !!selectedMinifig,
        }
    );

    const fetchMinifigParts = (set_num: string | null) =>
        fetch(`${API_URL}/api/v3/lego/minifigs/${set_num}/parts/`, {
            headers: { Authorization: `key ${API_KEY}` }
        })
            .then(res => res.json());

    const { data: minifigParts, isLoading, error } = useQuery(
        ['minifigParts', selectedMinifig],
        () => fetchMinifigParts(selectedMinifig),
        {
            enabled: !!selectedMinifig,
        }
    );

    return (
        <PageContainer>
            <FormContainer>
                <FormTitle>SHIPPING DETAILS</FormTitle>
                <FormAndDetailsContainer>
                    <FormWrapper>
                        <form onSubmit={formik.handleSubmit}>
                            <HorizontalGroup>
                                <FormGroup>
                                    <label>Name</label>
                                    <HalfInput
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        hasError={!!(formik.errors.name && formik.touched.name)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Surname</label>
                                    <HalfInput
                                        type="text"
                                        name="surname"
                                        placeholder="Surname"
                                        value={formik.values.surname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        hasError={!!(formik.errors.surname && formik.touched.surname)}
                                    />
                                </FormGroup>
                            </HorizontalGroup>
                            <label>Phone Number</label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                hasError={!!(formik.errors.phoneNumber && formik.touched.phoneNumber)}
                            />
                            <label>Email</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                hasError={!!(formik.errors.email && formik.touched.email)}
                            />
                            <label>Date of birth</label>
                            <Input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date of Birth"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                hasError={!!(formik.errors.dateOfBirth && formik.touched.dateOfBirth)}
                            />
                            <label>Address</label>
                            <Input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                hasError={!!(formik.errors.address && formik.touched.address)}
                            />
                            <label>City</label>
                            <Input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                hasError={!!(formik.errors.city && formik.touched.city)}
                            />
                            <HorizontalGroup>
                                <FormGroup>
                                    <label>State</label>
                                    <HalfInput
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        hasError={!!(formik.errors.state && formik.touched.state)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Zip Code</label>
                                    <HalfInput
                                        type="text"
                                        name="zipCode"
                                        placeholder="Zip Code"
                                        value={formik.values.zipCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        hasError={!!(formik.errors.zipCode && formik.touched.zipCode)}
                                    />
                                </FormGroup>
                            </HorizontalGroup>
                        </form>
                    </FormWrapper>
                    <DetailsContainer>
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error fetching data</p>}
                        {
                            minifigParts && (
                                <MinifigDetails data={minifigParts} minifigImage={minifigData?.set_img_url}/>
                            )
                        }
                    </DetailsContainer>
                </FormAndDetailsContainer>
            </FormContainer>
        </PageContainer>
    );
}

export default ShippingDetailsPage;
