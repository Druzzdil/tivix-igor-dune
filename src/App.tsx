import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StyledHomePage from './Pages/StyledHomePage/StyledHomePage';
import DrawResultPage from './Pages/DrawingResultPage/DrawingResultPage';
import ShippingDetailsPage from './Pages/ShippingPage/ShippingPage';

const queryClient = new QueryClient();

function App() {
    return (
        <div className="layout">
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<StyledHomePage />} />
                        <Route path="/draw-result" element={<DrawResultPage />} />
                        <Route path="/shipping" element={<ShippingDetailsPage />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );
}

export default App;
