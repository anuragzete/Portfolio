import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import App from './App.jsx';
import './index.css';
import {DataProvider} from "./context/DataProvider.jsx";
import ScrollToTop from "./shared/utils/ScrollToTop.jsx";
// import Unavailable from "./shared/components/Unavailable.jsx" 

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <DataProvider>
                <BrowserRouter>
                    <ScrollToTop/>
                        <App />
                        {/* <Unavailable /> */}
                </BrowserRouter>
            </DataProvider>
        </ThemeProvider>
    </StrictMode>
);
