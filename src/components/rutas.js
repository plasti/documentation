import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, Route, Routes, useLocation} from "react-router-dom";

// navegacion
import Home from '../Home';

//documentacion
import Documentacion from '../docs/documentacion';


// foro
// import Foro from '../foro/foro';  

// app mobil
import AppMobil from '../app-mobile/app';  

// contacto
import Contacto from '../contacto/contacto';

// instalacion
import Config from '../admin/config';
import Login from '../admin/login';
import Page404 from '../404/page404';


// screens
// login
function AnimatedRoutes(props) {
	const location = useLocation()
  const navigate = useNavigate()
  let config = props.config
  let admin = props.admin
  let setLogin = props.setLogin
	return (
		<AnimatePresence>
      <Routes location={location} key={location.pathname}>
        
        {/*home*/}
        <Route path="/" element={<Home config={config} navigate={navigate}/>}/>
        
        {/*documentacion*/}
        <Route path="documentacion/:item" element={<Documentacion navigate={navigate} config={config} admin={admin}/>}/>

        {/*foto*/}
        {/*<Route path="foro" element={<Foro navigate={navigate}/>}/>*/}

        {/*app*/}
        {<Route path="app" element={<AppMobil config={config} navigate={navigate}/>}/>}

        {/*contacto*/}
        <Route path="contacto" element={<Contacto config={config} navigate={navigate}/>}/>

        {/*Instalacion*/}
        <Route path="/settings" element={<Config navigate={navigate} admin={admin}/>}/>
        <Route path="/login" element={<Login navigate={navigate} setLogin={setLogin}/>}/>
        <Route path="*" element={<Page404 navigate={navigate} config={config}/>}/>
      </Routes>
    </AnimatePresence>
	)
}

export default AnimatedRoutes;