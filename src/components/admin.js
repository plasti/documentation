import React from 'react';
import {post, url} from '../utiles';

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="panel-admin">
        <a href="#" className="icon-item" til="Agregar item al menú lateral"></a>
        <a href="#" className="icon-menu" til="Agregar item desplegable"></a>
        <a href="#" className="icon-subitem" til="Agregar subitem al desplegable"></a>
        <div className="vertical"></div>
        <a href="#" className="icon-text" til="Agregar texto"></a>
        <a href="#" className="icon-gallery" til="Agregar imagen"></a>
        <a href="#" className="icon-video" til="Agregar video"></a>
        <a href="#" className="icon-code" til="Agregar bloque de código"></a>
        <div className="vertical"></div>
        <a href="#" className="icon-save" til="Guardar"></a>
        <a href="#" className="icon-close" til="Cancelar"></a>
        <div className="vertical"></div>
        <a href="#" className="icon-logout" til="Cerrar sesión"></a>
      </div>
    )
  }
}