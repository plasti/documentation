import React from 'react';
import {url} from '../utiles';
import { NavLink } from "react-router-dom";


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <footer style={{background: this.props.primario}}>
        <div className="ancho">
          <div className="columns" style={{borderColor: this.props.terciario}}>
            <div>
              <h3 style={{color: this.props.secundario}}>Nuestas redes</h3>
              <div className="menu-foo">
                {this.props.redes.f != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.f} target="_blank">Facebook</a>)}
                {this.props.redes.i != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.i} target="_blank">Instagram</a>)}
                {this.props.redes.l != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.l} target="_blank">Linkedin</a>)}
                {this.props.redes.y != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.y} target="_blank">Youtube</a>)}
                {this.props.redes.w != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.w} target="_blank">Whtasapp</a>)}
                {this.props.redes.web != '' && (<a style={{color: this.props.secundario}} href={this.props.redes.web} target="_blank">Sitio web</a>)}
              </div>
            </div>
            <div>
              <h3 style={{color: this.props.secundario}}>Menu</h3>
              <div className="menu-foo">
                <NavLink to="/" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}}>Inicio</NavLink>
                <NavLink to="/documentacion/inicio" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}}>Documentación</NavLink>
                <NavLink to="/foro" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}} href="#">Foro</NavLink>
                <NavLink to="contacto" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}} href="#">Contacto</NavLink>
              </div>
            </div>
            <div>
              <NavLink
                to="/"
                title={this.props.title} 
                className="logo"
              >
                <img src={url+'/'+this.props.logo} title={this.props.title}/>
              </NavLink>
            </div>
          </div>
        </div>
        <span className="copy" style={{color: this.props.secundario}}>&copy; {this.props.title}  - {new Date().getFullYear()}</span>
      </footer> 
    )
  }
}

