import React from 'react';
import {post, url} from '../utiles';

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
  }

  logout() {
    localStorage.setItem('@login_documentation', '');
    window.location.href = '/'
  }

  selectBlock(e, type) {
    e.preventDefault()
    this.props.changeBlock(type)
  }

  render() {
    return (
      <div className="panel-admin">
        <a href="#" className="icon-logout" onClick={() => this.logout()} til="Cerrar sesión"></a>
        <a href="#" className="icon-settings" onClick={() => this.props.navigate('/settings')} til="Configuración"></a>
        <div className="vertical"></div>
        <a href="#" className={`icon-text ${this.props.active == 'text' ? "active" : ""}`} onClick={(e) => this.selectBlock(e, (this.props.active == 'text') ? '' : 'text')} til="Agregar texto"></a>
        <a href="#" className={`icon-gallery ${this.props.active == 'imagen' ? "active" : ""}`} onClick={(e) => this.selectBlock(e, (this.props.active == 'imagen') ? '' : 'imagen')} til="Agregar imagen"></a>
        <a href="#" className={`icon-video ${this.props.active == 'video' ? "active" : ""}`} onClick={(e) => this.selectBlock(e, (this.props.active == 'video') ? '' : 'video')} til="Agregar video"></a>
        <a href="#" className={`icon-code ${this.props.active == 'code' ? "active" : ""}`} onClick={(e) => this.selectBlock(e, (this.props.active == 'code') ? '' : 'code')} til="Agregar bloque de código"></a>
        <div className="vertical"></div>
        <a href="#" className="icon-save" onClick={(e) => {e.preventDefault(); this.props.save()}} til="Guardar"></a>
        <a href="#" className="icon-close" til="Cancelar"></a>
      </div>
    )
  }
}





