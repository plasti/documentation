import React from 'react';
import {post, url} from './utiles';
import Aside from './components/aside'
import Editor from './components/editor'
import Admin from './components/admin'

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      config: {},
      content: []
    }
  }

  componentDidMount() {
    let config = localStorage.getItem('@'+window.location.hostname+'_documentarion');
    if(config != null && config != undefined && config != '') {
      config = JSON.parse(config);
      this.setState({
        config: {
          title: config.title,
          description: config.description,
          logo: config.logo,
          favicon: config.favicon,
          primario: config.primario,
          secundario: config.secundario,
          terciario: config.terciario,
          foro: config.foro,
          login: config.login,
          facebook: config.facebook,
          instagram: config.instagram,
          linkedin: config.linkedin,
          whatsapp: config.whatsapp,
          youtube: config.youtube,
          email: config.email,
          phone: config.phone,
        },
        loading: false,
      })
    }else {
      this.getSite();
    }
  }

  getSite() {
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
          email: data.config.email,
          phone: data.config.phone,
        }
        localStorage.setItem('@'+window.location.hostname+'_documentarion', JSON.stringify(store));
        this.setState({config: store, loading: false});
      }else {
        this.props.navigate('/install');
      }
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading">
          <span>Cargando...</span>
        </div>
      )
    }else {
      return (
        <div className="main">
          <header style={{background: this.state.config.primario}}>
            <div className="ancho">
              <a 
                href="#" 
                onClick={() => this.props.navigate('/')} 
                title={this.state.config.title} 
                className="logo"
              >
                <img src={url+'/'+this.state.config.logo} title={this.state.config.title}/>
              </a>
              <nav>
                <a href="#">Inicio</a>
                <a href="#">Documentación</a>
                <a href="#">Foro</a>
                <a href="#">Contacto</a>
                <a href="#" className="search">
                  <svg width="20" height="20" className="search-icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  Buscar
                </a>
              </nav>            
            </div>
          </header> 
          <div className="contiainer-content">
            {/*Menu*/}
            <Aside />
            {/*Contenido*/}
            <section className="content">
              <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>

              <Editor onInsert={html => {
                let content = this.state.content
                content += html
                this.setState({content})
              }}/>
            </section>
          </div>
          <footer>
              
          </footer>
          <Admin/>
        </div>
      )
    }
  }
}

