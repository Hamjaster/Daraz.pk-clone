import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from './context/contextApi';
import { ToastContainer } from 'react-toastify';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <ChakraProvider>
        <React.StrictMode>
          <ToastContainer />
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </ContextProvider>
  </BrowserRouter>
);

