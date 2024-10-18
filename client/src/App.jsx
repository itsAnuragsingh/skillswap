import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Dashboard from './components/Dashboard';
import LearningSelectionPage from './components/LearningSelectionPage';

import Home from './components/Home';
import Community from './components/Community';




const App = () => {
  return (

    
    <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/learn" element={<LearningSelectionPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/community" element={<Community/>} />
    
    </Routes>
  )
}

export default App