import React from 'react';
import {post, url, id} from './utiles';
import Contacto from './components/contacto'

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log(this.props)
  }
  render() {
    return (
      <>
        <div className="home" style={{background: this.props.config.primario}}>
          <div className="ancho">
            <h1 style={{color: this.props.config.secundario}}>{this.props.config.title}</h1>
            <h2 style={{color: this.props.config.secundario}}>{this.props.config.description}</h2>
            <div className="btns">
              <a href="#" onClick={(e) => {e.preventDefault(); this.props.navigate('/documentacion/inicio')}} className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir a la documentación</a>
              <a href="#" onClick={(e) => {e.preventDefault(); this.props.navigate('/foro')}} className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir al Foro</a>
              {this.props.config.web != '' && (<a href={this.props.config.web} target="_blank" className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir al sitio web</a>)}
            </div>
          </div>
        </div>
        <Contacto config={this.props.config} />
      </>
    )
  }
}

