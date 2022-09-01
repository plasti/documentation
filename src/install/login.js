import React from 'react';
import {motion} from 'framer-motion';
import {post} from '../utiles';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      user: '',
      password: '',
    }
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  login() {
    if(this.state.user != '' && this.state.password != '') {
      post({
        action: 'auth',
        user: this.state.user,
        password: this.state.password
      }).then(data => {
        if(data.status) {
          localStorage.setItem('@login_documentation', 'ZXN0YSBhdXRlbnRpY2Fkbw==');
          this.props.navigate('/', {replace: true});
        }else {
          alert(data.data);
        }
      })
    }else {
      alert('Ingresa el usuario y la Contraseña.');
    }
  }

  render() {
    return (
      <div className={`instalacion ${this.state.loading ? "loading" : ""}`}>
        <motion.div 
          className="card"
          transition={{ duration: 0.3}}
          initial={{x: -window.innerWidth}}
          animate={{x: 0}}
          exit={{x: window.innerWidth}}
        >
          <h2>Inicio de sesión</h2>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" placeholder="..." value={this.state.user} name="user" onChange={(e) => this.handleInput(e)} />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="..." value={this.state.password} name="password" onChange={(e) => this.handleInput(e)} />
          </div>
          <div className="btns">
            <a href="#" className="btn" onClick={() => this.login()}>Ingresar</a>
          </div>
        </motion.div>
        <span className="copy"><a href="#">Hexa Software</a> - Apps</span>
      </div>
    )
  }
}

