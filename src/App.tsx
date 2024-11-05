import { ThemeProvider } from '@emotion/react';
import Router from './components/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Theme } from '@emotion/react';
import useTokenStore from './stores/useTokenStore';

const queryClient = new QueryClient();

const theme: Theme = {
  colors: {
    primary: '#000',
    secondary: '#fff',
    background: '#f0f0f0',
    text: '#000',
    border: '#4740CF',
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
  const { accessToken } = useTokenStore();

  if (
    !accessToken &&
    window.location.pathname !== '/login' &&
    window.location.pathname !== '/signup'
  ) {
    window.location.href = '/login';
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
