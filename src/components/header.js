import React from 'react';
import {post, url, Levenshtein} from '../utiles';
import { NavLink } from "react-router-dom";
import Modal from './modal'

var menu = []
const buscador = (item, valor) => {
  let keywords = item.keywords.split(', ')
  let coin = 0
  for(let key of keywords) {
    if(Levenshtein(key.toLowerCase(), valor.toLowerCase()) < 3) {
      coin++
    }
  }
  return coin > 0
}
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal_search: false,
      keywords: null,
      menuShow: [],
      history: [],
    }
  }


  getMenu() {
    this.setState({modal_search: true}, () => {
      post({action: 'get_menu'}).then(data =>  {
        menu = data.menu
        this.setState({
          menuShow: menu,
          keywords: null,
        }, () => this.getHistory())
      })
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
                var a = menu
                var result = a.filter(ia => {
                  if("keywords" in ia) {
                    return buscador(ia, e.target.value)
                  }else {
                    return true
                  }
                })
                result = result.map(r => {
                  if("items" in r) {
                    let i = r.items
                    i = i.map(sub => {
                      if(buscador(sub, e.target.value)) {
                        return sub
                      }
                    })

                    if(i.filter(p => p != undefined).length > 0) {
                      r.items = i.filter(p => p != undefined)
                      return r
                    }
                  }else {
                    return r
                  }
                })
                result = result.filter(rr => rr != undefined)

                let result2 = a.filter(ia => {
                  if("keywords" in ia) {
                    return ia.keywords.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
                  }else {
                    return true
                  }
                })

                result2 = result2.map(r => {
                  if("items" in r) {
                    let i = r.items
                    i = i.map(sub => {
                      if(sub.keywords.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)  {
                        return sub
                      }
                    })
                    if(i.filter(p => p != undefined).length > 0) {
                      r.items = i.filter(p => p != undefined)
                      return r
                    }
                  }else {
                    return r
                  }
                })
                result2 = result2.filter(rr => rr != undefined)
                
                for(let r2 of result2) {
                 if(result.indexOf(r2) == -1)  {
                  result.push(r2)
                 }
                }
                this.setState({menuShow: result})
              }else {
                this.setState({menuShow: menu})
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
          <div className={`container-results ${menu.length > 0 ? "" : "loader"}`}>
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
            {this.props.logo != undefined ? (
              <>
                <img className="logo-big" src={url+'/'+this.props.logo} title={this.props.title}/>
                <img className="logo-small" src={url+'/'+this.props.favicon} title={this.props.title}/>
              </>
            ): (
              <>
                <img className="logo-big" src={require('../img/logo.png')} title={this.props.title}/>
                <img className="logo-small" src={require('../img/logo.png')} title={this.props.title}/>
              </>
            )}
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

