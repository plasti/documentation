import React from 'react';
import {post, url} from '../utiles';

export default class Contacto extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      subject: '',
      description: '',
      loading: false,
    }
  }


  send() {
    if(!this.state.loading) {
      if(this.state.name != '' && this.state.phone != '' && this.state.subject != '' && this.state.description != '') {
        this.setState({loading: true}, () => {
          post({
            action: 'send_mail',
            name: this.state.name,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.description,
          }).then((data) => {
            if(data.status) {
              alert('¡Mensaje enviado!')
              this.setState({
                loading: false,
                name: '',
                phone: '',
                subject: '',
                description: '',
              })
            }
          }).catch(err => {
            alert('Ocurrió un error, intentalo más tarde', 'danger')
            this.setState({
              loading: false,
              name: '',
              phone: '',
              subject: '',
              description: '',
            })
          })
        })
      }else {
        alert('Porfavor completa los campos', 'danger')
      }
    }
  }


  render() {
    return (
      <>
        <div className="home" style={{background: this.props.config.primario}}>
          <div className="ancho">
            <h1 style={{color: this.props.config.secundario}}>¿Necesitas ayuda?</h1>
            <h2 style={{color: this.props.config.secundario}}>Puedes escribirnos y te atenderemos tan pronto como sea posible</h2>
            <form action="">
              <div className="inputs">
                <input value={this.state.name} style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} onChange={(e) => this.setState({name: e.target.value})} type="text" placeholder="Nombre"/>
                <input value={this.state.phone} style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} onChange={(e) => this.setState({phone: e.target.value})} type="text" placeholder="Telefono"/>
                <input value={this.state.subject} style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} onChange={(e) => this.setState({subject: e.target.value})} type="text" placeholder="Asunto"/>
              </div>
              <textarea value={this.state.description} style={{borderColor: this.props.config.terciario, color: this.props.config.secundario}} placeholder="¿Como podemos ayudarte?" onChange={(e) => this.setState({description: e.target.value})}></textarea>
            </form>
            <div className="btns">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                this.send()
              }} className={`btn ${this.state.loading ? "loader" : ""}`} style={{color: this.props.config.primario, backgroundColor: this.props.config.terciario}}>Enviar</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

