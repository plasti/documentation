import React from 'react';
import {motion} from 'framer-motion';

export default class Install extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,

      // 1
      title: "",
      description: "",
      logo: "",
      favicon: "",

      // 2
      primario: "",
      secundario: "",
      terciario: "",
      foro: false,
      login: false,

      // 3
      facebook: "",
      instagram: "",
      linkedin: "",
      whatsapp: "",
      youtube: "",
      email: "",
      phone: "",

      // 4
      user: '',
      password: '',
    }
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }


  render() {
    return (
      <div className="instalacion">
        <div className="steps">
          <a href="#" onClick={() => this.setState({active: 1})} className={`${this.state.active == 1 ? "active" : ""} ${this.state.title != '' ? "ok" : ""}`}>1</a>
          <a href="#" onClick={() => this.setState({active: 2})} className={`${this.state.active == 2 ? "active" : ""} ${this.state.primario != '' && this.state.secundario != '' && this.state.terciario != '' ? "ok" : ""}`}>2</a>
          <a href="#" onClick={() => this.setState({active: 3})} className={`${this.state.active == 3 ? "active" : ""} ${this.state.email != '' ? "ok" : ""}`}>3</a>
          <a href="#" onClick={() => this.setState({active: 4})} className={`${this.state.active == 4 ? "active" : ""} ${this.state.user != '' && this.state.password != '' ? "ok" : ""}`}>4</a>
        </div>

        {this.state.active == 1 && (
          <motion.div 
            className="card"
            transition={{ duration: 0.3}}
            initial={{x: -window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
          >
            <h2>¡Bienvenido!</h2>
            <p>Vamos a proceder con la instalación de la aplicación.</p>
            <div className="form-group">
              <label>Titulo del sitio</label>
              <input type="text" placeholder="..." name="title" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="form-group">
              <label>Descripción del sitio</label>
              <input type="text" placeholder="..." name="description" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="select-logo">
              <div>
                <label>Logo (300px X 150px)</label>
                <input type="file" onChange={(e) => console.log(e)}/>
              </div>
              <div>
                <label>50px</label>
                <input type="file" onChange={(e) => console.log(e)}/>
              </div>
            </div>
            <div className="btns">
              <a href="#" className="btn" onClick={() => this.setState({active: 2})}>Siguiente ❯</a>
            </div>
          </motion.div>
        )}
        {this.state.active == 2 && (
          <motion.div 
            className="card"
            transition={{ duration: 0.3}}
            initial={{x: -window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
          >
            <h2>Vamos a ponerle color</h2>
            <div className="form-group">
              <label>
                <input type="color" name="primario" onChange={(e) => this.handleInput(e)} />
                Color primario
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="color" name="secundario" onChange={(e) => this.handleInput(e)} />
                Color secundario
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="color" name="terciario" onChange={(e) => this.handleInput(e)} />
                Color terciario
              </label>
            </div>

            <div className="form-group">
              <label>
                <input type="checkbox" name="foro" onChange={(e) => this.handleInput(e)} />
                Habilitar foro
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" name="login" onChange={(e) => this.handleInput(e)} />
                Requiere autenticación
              </label>
            </div>
            <div className="btns">
              <a href="#" className="btn" onClick={() => this.setState({active: 1})}>❮ Anterior</a>
              <a href="#" className="btn" onClick={() => this.setState({active: 3})}>Siguiente ❯</a>
            </div>
          </motion.div>
        )}
        {this.state.active == 3 && (
          <motion.div 
            className="card"
            transition={{ duration: 0.3}}
            initial={{x: -window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
          >
            <h2>Datos de contacto</h2>
            <div className="columns">
              <div>
                <div className="form-group">
                  <label>Facebook</label>
                  <input type="text" placeholder="..." name="facebook" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input type="text" placeholder="..." name="instagram" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Linkedin</label>
                  <input type="text" placeholder="..." name="linkedin" onChange={(e) => this.handleInput(e)} />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Youtube</label>
                  <input type="text" placeholder="..." name="youtube" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Whatsapp</label>
                  <input type="text" placeholder="..." name="whatsapp" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" placeholder="..." name="email" onChange={(e) => this.handleInput(e)} />
                </div>
              </div>
            </div>
            <div className="btns">
              <a href="#" className="btn" onClick={() => this.setState({active: 2})}>❮ Anterior</a>
              <a href="#" className="btn" onClick={() => this.setState({active: 4})}>Siguiente ❯</a>
            </div>
          </motion.div>
        )}
        {this.state.active == 4 && (
          <motion.div 
            className="card"
            transition={{ duration: 0.3}}
            initial={{x: -window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
          >
            <h2>Ya casi, falta un solo paso</h2>
            <p>Necesitamos un usuario administrador.</p>
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" placeholder="..." name="user" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="text" placeholder="..." name="password" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="btns">
              <a href="#" className="btn" onClick={() => this.setState({active: 3})}>❮ Anterior</a>
              <a href="#" className="btn" onClick={() => this.setState({active: 4})}>Finalizar ✓</a>
            </div>
          </motion.div>
        )}
        <span className="copy"><a href="#">Hexa Software</a> - Apps</span>
      </div>
    )
  }
}

