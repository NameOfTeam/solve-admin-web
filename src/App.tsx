import { ThemeProvider } from '@emotion/react';
import Router from './components/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Theme } from '@emotion/react';

const queryClient = new QueryClient();

const theme: Theme = {
  colors: {
    primary: '#000',
    secondary: '#fff',
    tertiary: '#000',
  },
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
