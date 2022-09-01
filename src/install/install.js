import React from 'react';
import {motion} from 'framer-motion';
import {post, url} from '../utiles';

export default class Install extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
      loading: true,
      logo_show: '',
      favicon_show: '',

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
  componentDidMount() {
    post({action: 'get_config'}).then(data =>  {
      data = data.config;
      this.setState({
        title: data.title,
        description: data.description,
        logo_show: (data.logo != '') ? (url+'/'+data.logo) : '',
        favicon_show: (data.favicon != '') ? (url+'/'+data.favicon) : '',
        primario: data.primario,
        secundario: data.secundario,
        terciario: data.terciario,
        foro: data.foro,
        login: data.login,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        whatsapp: data.whatsapp,
        youtube: data.youtube,
        email: data.email,
        phone: data.phone,
        user: btoa(data.user),
        password: btoa(data.password),
        loading: false,
      });
    })
  }
  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  selectLogo(e) {
    if (!e.target.files || !e.target.files[0]) return;
    const setImg = img => this.setState({logo: img, logo_show: img})
    const FR = new FileReader();
    FR.addEventListener("load", function(evt) {
      setImg(evt.target.result);
    }); 
    FR.readAsDataURL(e.target.files[0]);
  }
  selectFavicon(e) {
    if (!e.target.files || !e.target.files[0]) return;
    const setImg = img => this.setState({favicon: img, favicon_show: img})
    const FR = new FileReader();
    FR.addEventListener("load", function(evt) {
      setImg(evt.target.result);
    }); 
    FR.readAsDataURL(e.target.files[0]);
  }
  finalizar() {
    if(this.state.title != '' && this.state.primario != '' && this.state.secundario != '' && this.state.terciario != '' && this.state.email != '' && this.state.user != '' && this.state.password != '') {
      this.setState({loading: true}, () => {
        post({
          action: 'set_config',
          // 1
          title: this.state.title,
          description: this.state.description,
          logo: this.state.logo,
          favicon: this.state.favicon,
          // 2
          primario: this.state.primario,
          secundario: this.state.secundario,
          terciario: this.state.terciario,
          foro: this.state.foro,
          login: this.state.login,
          // 3
          facebook: this.state.facebook,
          instagram: this.state.instagram,
          linkedin: this.state.linkedin,
          whatsapp: this.state.whatsapp,
          youtube: this.state.youtube,
          email: this.state.email,
          phone: this.state.phone,
          // 4
          user: this.state.user,
          password: this.state.password,
        }).then(data =>  {
          if(data.status) {
            this.props.navigate('/login');
          }
        })
      })
    }
  }
  render() {
    return (
      <div className={`instalacion ${this.state.loading ? "loading" : ""}`}>
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
              <input type="text" placeholder="..." value={this.state.title} name="title" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="form-group">
              <label>Descripción del sitio</label>
              <input type="text" placeholder="..." value={this.state.description} name="description" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="select-logo">
              <div>
                {this.state.logo_show == "" ? (
                  <label>Logo (200px X 50px)</label>
                ): (
                  <img src={this.state.logo_show}/>
                )}
                <input type="file" accept="image/*" onChange={(e) => this.selectLogo(e)}/>
              </div>
              <div>
                {this.state.favicon_show == "" ? (
                  <label>50px</label>
                ): (
                  <img src={this.state.favicon_show}/>
                )}
                <input type="file" accept="image/*" onChange={(e) => this.selectFavicon(e)}/>
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
                <input type="color" value={this.state.primario} name="primario" onChange={(e) => this.handleInput(e)} />
                Color primario
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="color" value={this.state.secundario} name="secundario" onChange={(e) => this.handleInput(e)} />
                Color secundario
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="color" value={this.state.terciario} name="terciario" onChange={(e) => this.handleInput(e)} />
                Color terciario
              </label>
            </div>

            <div className="form-group">
              <label>
                <input type="checkbox" defaultChecked={this.state.foro} name="foro" onChange={() => this.setState({foro: !this.state.foro})} />
                Habilitar foro
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" defaultChecked={this.state.login} name="login" onChange={() => this.setState({login: !this.state.login})} />
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
                  <input type="text" placeholder="..." value={this.state.facebook} name="facebook" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input type="text" placeholder="..." value={this.state.instagram} name="instagram" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Linkedin</label>
                  <input type="text" placeholder="..." value={this.state.linkedin} name="linkedin" onChange={(e) => this.handleInput(e)} />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Youtube</label>
                  <input type="text" placeholder="..." value={this.state.youtube} name="youtube" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Whatsapp</label>
                  <input type="text" placeholder="..." value={this.state.whatsapp} name="whatsapp" onChange={(e) => this.handleInput(e)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" placeholder="..." value={this.state.email} name="email" onChange={(e) => this.handleInput(e)} />
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
              <input type="text" placeholder="..." value={this.state.user} name="user" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="text" placeholder="..." value={this.state.password} name="password" onChange={(e) => this.handleInput(e)} />
            </div>
            <div className="btns">
              <a href="#" className="btn" onClick={() => this.setState({active: 3})}>❮ Anterior</a>
              <a href="#" className="btn" onClick={() => this.finalizar()}>Finalizar ✓</a>
            </div>
          </motion.div>
        )}
        <span className="copy"><a href="#">Hexa Software</a> - Apps</span>
      </div>
    )
  }
}

