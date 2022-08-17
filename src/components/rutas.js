import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, Route, Routes, useLocation} from "react-router-dom";

// instalacion
import Install from '../install/install';

// navegacion
import Home from '../home';

// screens
// login
function AnimatedRoutes() {
	const location = useLocation();
  const navigate = useNavigate()
	return (
		<AnimatePresence>
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<Home navigate={navigate}/>}/>
        
        {/*Instalacion*/}
        <Route path="/install" element={<Install />}/>
      </Routes>
    </AnimatePresence>
	)
}

export default AnimatedRoutes;