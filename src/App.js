import React, {useState, useEffect} from 'react';
import {post, url, id} from './utiles';
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from './components/rutas'
import Header from './components/header'
import Footer from './components/footer'
import './App.css';



window.alert = (msg, type = 'success', duration = 5000) => {
  let p = document.createElement("p");
  let btn = document.createElement("a");
  let div = document.createElement("div")
  p.innerHTML = msg;
  btn.setAttribute('href', '#');
  btn.setAttribute('class', 'icon-close');
  btn.addEventListener('click', function (e) { this.parentNode.remove(); })
  div.setAttribute('class', type);
  div.appendChild(p);
  div.appendChild(btn);
  document.getElementById('notifications').appendChild(div);
  setTimeout(() => {
    div.animate([{ opacity:1},{opacity:0}], {duration: 300});
    setTimeout(() => div.remove(), 250);
  }, duration)
}

window.confirm = (msg, callback) => {
  let p = document.createElement("p");
  let btn = document.createElement("a");
  let btn2 = document.createElement("a");
  let padre = document.createElement("div")
  let box = document.createElement("div")
  let botones = document.createElement("div")
  p.setAttribute('class', 'msg-confirm');
  p.innerHTML = msg;
  // boton de aceptar
  btn.innerHTML = 'Aceptar';
  btn.setAttribute('href', '#');
  btn.addEventListener('click', function (e) { 
    this.parentNode.parentNode.parentNode.remove(); 
    callback();
  })
  // boton de cancelar
  btn2.innerHTML = 'Cancelar';
  btn2.setAttribute('href', '#');
  btn2.addEventListener('click', function (e) { 
    this.parentNode.parentNode.parentNode.remove(); 
  })
  // div de botones
  botones.setAttribute('class', 'botones-confirm');
  botones.appendChild(btn);
  botones.appendChild(btn2);
  // agregar botones y texto
  box.setAttribute('class', 'body-modal');
  box.appendChild(p);
  box.appendChild(botones);
  padre.setAttribute('class', 'modal-app');
  padre.appendChild(box);
  document.getElementsByTagName('body')[0].appendChild(padre);
}



export default function App() {
  const [loading, setLoadig] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [config, setConfig] = useState({});
  const icon = (url) => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
  }

  const getAdmin = () => {
    let admin = localStorage.getItem('@login_documentation');
    setAdmin(admin == 'ZXN0YSBhdXRlbnRpY2Fkbw==')
  }

  const getSite = () => {
    post({action: 'get_config'}).then(data =>  {
      if(data.config.title != '') {
        let store = {
          title: data.config.title,
          description: data.config.description,
          logo: data.config.logo,
          favicon: data.config.favicon,
          primario: data.config.primario,
          secundario: data.config.secundario,
          terciario: data.config.terciario,
          foro: data.config.foro,
          login: data.config.login,
          facebook: data.config.facebook,
          instagram: data.config.instagram,
          linkedin: data.config.linkedin,
          whatsapp: data.config.whatsapp,
          youtube: data.config.youtube,
          web: data.config.web,
          code_login: data.config.code_login
        }
        document.title = store.title
        icon(url+'/'+store.favicon)
        setConfig(store);
        setLoadig(false)
      }else {
        window.location.href = '/settings'
      }
    });
  }


  useEffect(() => {
    getSite()
    getAdmin()
  }, [])

  return (
    <>
    {loading ? (
      <div className="loading">
        <span>Cargando...</span>
      </div>
    ) : (
      <div className="App">
        <ul className="notifications" id="notifications"></ul>
        <div className="main">
          <Router>
            <Header
              primario={config.primario}
              secundario={config.secundario}
              terciario={config.terciario}
              logo={config.logo}
              title={config.title}
            />
            <AnimatedRoutes config={config} admin={admin} setLogin={(v) => setAdmin(v)}/>
             <Footer
              redes={{email: config.email, f: config.facebook, i: config.instagram, w: config.whatsapp, y: config.youtube, l: config.linkedin, web: config.web}}
              primario={config.primario}
              secundario={config.secundario}
              terciario={config.terciario}
              logo={config.logo}
              title={config.title}
            />
          </Router>
        </div>
      </div>
    )}
    </>
  )
}