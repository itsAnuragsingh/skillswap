import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Dashboard from './components/Dashboard';
import LearningSelectionPage from './components/LearningSelectionPage';

import Home from './components/Home';
import Community from './components/Community';
import PrivateLayout from './components/PrivateLayout ';
import PublicLayout from './components/PublicLayout';




const App = () => {
  return (

    
    <Routes>
 <Route element={<PublicLayout/>}>
    <Route path="/" element={<Home/>} />
    </Route>
    <Route element={<PrivateLayout/>}>
    <Route path="/learn" element={<LearningSelectionPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/community" element={<Community/>} />
    </Route>
    
    </Routes>
  )
}

export default App