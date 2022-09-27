import React from 'react';
import {post, url} from '../utiles';
import { NavLink } from "react-router-dom";
import Modal from './modal'


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal_search: false,
      keywords: null,
      menu: [],
      menuShow: [],
      history: [],
    }
  }


  getMenu() {
    post({action: 'get_menu'}).then(data =>  {
      let menu = data.menu
      this.setState({menu: menu, menuShow: [], modal_search: true, keywords: null}, () => this.getHistory())
    })
  }

  getHistory() {
    let history = localStorage.getItem('@history_search')
    history = (history) ? JSON.parse(history) : [];
    this.setState({history: history})
  }

  addHistory(item) {
    let history = localStorage.getItem('@history_search')
    history = (history) ? JSON.parse(history) : [];
    if(history.length > 8) {
      history.shift()
    }
    history.push(item)
    localStorage.setItem('@history_search', JSON.stringify(history))
  }

  modalBuscar() {
    if(this.state.modal_search) {
      return (
        <Modal active={this.state.modal_search} onClose={() => this.setState({modal_search: false})}>
          <input
            className="input-buscar"
            type="text" 
            style={{borderColor: this.props.terciario}}
            placeholder="Buscar algo..." 
            onChange={(e) => {
              if(e.target.value.length > 2) {
                let t = e.target.value.toLowerCase()
                let results = this.state.menu.map(item => {
                  if(item.type == 'simple') {
                    if(item.keywords.toLowerCase().indexOf(t) > -1) {
                      return item
                    }else {
                      return null
                    }
                  }else {
                    item.items = item.items.filter(i => i.keywords.toLowerCase().indexOf(t) > -1)
                    if(item.items.length > 0) {
                      return item
                    }else {
                      return null
                    }
                  }
                })
                this.setState({menuShow: results.filter(o => o != null)})
              }else {
                this.setState({menuShow: []})
              }
            }}
          />
          {this.state.history.length > 0 && (
            <div className="history">
              <span>Historial</span>
              {this.state.history.map((h, i) => (
                <NavLink 
                  key={i}
                  to={h.link} 
                  onClick={() => this.setState({modal_search: false, keywords: null, menuShow: []})} 
                  style={{borderColor: this.props.terciario}}
                >{h.title}</NavLink>
              ))}
            </div>
          )}
          <div className="container-results">
            <ul className="results">
              {this.state.menuShow.map(m => {
                if(m.type == 'simple') {
                  return (
                    <li key={m.id}>
                      <NavLink 
                        to={"/documentacion/"+m.content} 
                        onClick={() => {
                          this.addHistory({title: m.title, link: "/documentacion/"+m.content})
                          this.setState({modal_search: false, keywords: null, menuShow: []})
                        }} 
                        style={{borderLeftColor: this.props.terciario}}
                      >{m.title}</NavLink>
                    </li>
                  )
                }else {
                  return (
                    <li key={m.id}>
                      <span>{m.title}</span>
                      <ul>
                        {m.items.map(item => (
                          <NavLink 
                            key={String(m.id)+'_'+String(item.id)} 
                            to={"/documentacion/"+m.content+'&'+item.content} 
                            onClick={() => {
                              this.addHistory({title: item.title, link: "/documentacion/"+m.content+'&'+item.content})
                              this.setState({modal_search: false, keywords: null, menuShow: []})
                            }}
                            style={{borderLeftColor: this.props.terciario}}
                          >{item.title}</NavLink>
                        ))}
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </Modal>
      )
    }
  }

  render() {
    return (
      <header style={{background: this.props.primario}}>
        {this.modalBuscar()}
        <div className="ancho">
          <NavLink
            to="/"
            title={this.props.title} 
            className="logo"
          >
            <img className="logo-big" src={url+'/'+this.props.logo} title={this.props.title}/>
            <img className="logo-small" src={url+'/'+this.props.favicon} title={this.props.title}/>
          </NavLink>
          <nav>
            <NavLink to="/" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}}>Inicio</NavLink>
            <NavLink to="/documentacion/inicio" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}}>Documentación</NavLink>
            <NavLink to="/app" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}} href="#">App móvil</NavLink>
            {/*<NavLink to="/foro" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}} href="#">Foro</NavLink>*/}
            <NavLink to="/contacto" style={{borderBottomColor: this.props.terciario, color: this.props.secundario}} href="#">Contacto</NavLink>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                this.getMenu()
              }}
              className="search"
              style={{outlineColor: this.props.terciario}}
            >
              <svg width="20" height="20" className="search-icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Buscar
            </a>
          </nav>            
        </div>
      </header> 
    )
  }
}

