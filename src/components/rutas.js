import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, Route, Routes, useLocation} from "react-router-dom";

// instalacion
import Install from '../install/install';
import Login from '../install/login';

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
        <Route path="/install" element={<Install navigate={navigate}/>}/>
        <Route path="/login" element={<Login navigate={navigate}/>}/>
      </Routes>
    </AnimatePresence>
	)
}

export default AnimatedRoutes;