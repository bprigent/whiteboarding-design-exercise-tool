import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define the Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default blue
    },
    secondary: {
      main: '#dc004e', // Default pink
    },
  },
  typography: {
    fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    h1: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
    h2: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
    h3: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
    h4: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
    h5: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
    body1: {
      fontFamily: `'Helvetica', 'Arial', sans-serif`, 
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);