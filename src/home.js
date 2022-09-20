import React from 'react';
import {post, url, id} from './utiles';
import Aside from './components/aside'
import Editor from './components/editor'
import Imagen from './components/imagen'
import Video from './components/video'
import Code from './components/code'
import Admin from './components/admin'

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log(this.props)
  }
// style={{background: 'linear-gradient('+this.props.config.primario+','+this.props.config.terciario+')'}}
  render() {
    return (
      <>
        <div className="home" style={{background: this.props.config.primario}}>
          <div className="ancho">
            <h1 style={{color: this.props.config.secundario}}>{this.props.config.title}</h1>
            <h2 style={{color: this.props.config.secundario}}>{this.props.config.description}</h2>
            <div className="btns">
              <a href="#" onClick={(e) => {e.preventDefault(); this.props.navigate('/documentacion')}} className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir a la documentación</a>
              <a href="#" onClick={(e) => {e.preventDefault(); this.props.navigate('/foro')}} className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir al Foro</a>
              {this.props.config.web != '' && (<a href={this.props.config.web} target="_blank" className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Ir al sitio web</a>)}
            </div>
          </div>
        </div>
        <div className="home" style={{background: this.props.config.primario}}>
          <div className="ancho">
            <h1 style={{color: this.props.config.secundario}}>¿Necesitas ayuda?</h1>
            <h2 style={{color: this.props.config.secundario}}>Puedes escribirnos y te tenderemos tan pronto como sea posible</h2>
            <form action="">
              <div className="inputs">
                <input style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} type="text" placeholder="Nombre"/>
                <input style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} type="text" placeholder="Telefono"/>
                <input style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} type="text" placeholder="Asunto"/>
              </div>
              <textarea style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} placeholder="¿Como podemos ayudarte?"></textarea>
            </form>
            <div className="btns">
              <a href="#" className="btn" style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Enviar</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

