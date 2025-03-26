import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById('root')!).render(
  <MantineProvider>

    <App />
  </MantineProvider>

)
