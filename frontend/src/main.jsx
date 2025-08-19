import {Auth0Provider} from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const queryClient=new QueryClient({
  defaultOPtions:{
    queries:{
      staleTime:60*1000,
      cacheTime: 10*60*1000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri:window.location.origin,
        audience:audience,
        scope:"openid profile email"
      }}
    >
       <App />
    </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>,
)
