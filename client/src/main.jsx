import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ClerkProvider} from '@clerk/clerk-react'
import { BrowserRouter as Router } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Router>
      <App />
    </Router>
    </ClerkProvider>
   
)