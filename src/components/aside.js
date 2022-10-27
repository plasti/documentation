import React from 'react';
import Switch from "react-switch";
import Loader from './loader'
import {post, url} from '../utiles';

// aside

// const history = useHistory()

export default class Aside extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menu: [],
      link: '',
      item: '',
      desplegable: false,
      active: false,
    }
  }

  componentDidMount() {
    post({action: 'get_menu'}).then(data =>  {
      let menu = data.menu
      // get Slug
      if(this.props.slug != 'inicio') {
        if(this.props.slug.indexOf('&') > -1) {
          let [slug1, slug2] = this.props.slug.split('&');
          let content = menu.filter(m => m.content == slug1)[0];
          if(content != undefined) {
            if("items" in content) {
              let item = content.items.filter(m => m.content == slug2)[0];
              if(item != undefined) {
                let next = null

                if(content.items[content.items.indexOf(item) + 1] != undefined) {
                  next = "/documentacion/"+content.content+'&'+content.items[content.items.indexOf(item) + 1].content
                }else {
                  if(menu[menu.indexOf(content)+1] != undefined) {
                    if(menu[menu.indexOf(content)+1].type == 'simple') {
                      next = "/documentacion/"+menu[menu.indexOf(content)+1].content
                    }else {
                      if(menu[menu.indexOf(content)+1].items[0] != undefined) {
                        next = "/documentacion/"+menu[menu.indexOf(content)+1].content+'&'+menu[menu.indexOf(content)+1].items[0].content
                      }
                    }
                  }
                }
                let prev = null
                if(content.items[content.items.indexOf(item) - 1] != undefined) {
                  prev = "/documentacion/"+content.content+'&'+content.items[content.items.indexOf(item) - 1].content
                }else {
                  if(menu[menu.indexOf(content)-1] != undefined) {
                    if(menu[menu.indexOf(content)-1].type == 'simple') {
                      prev = "/documentacion/"+menu[menu.indexOf(content)-1].content
                    }else {
                      if(menu[menu.indexOf(content)-1].items[menu[menu.indexOf(content)-1].items.length - 1] != undefined) {
                        prev = "/documentacion/"+menu[menu.indexOf(content)-1].content+'&'+menu[menu.indexOf(content)-1].items[menu[menu.indexOf(content)-1].items.length - 1].content
                      }
                    }
                  }
                }

                this.props.onSelect({
                  file: item.id+'_'+item.content+'.json',
                  title: content.title,
                  subtitle: item.title,
                  keywords: item.keywords,
                  type: 'subitem', 
                  id: content.id,
                  id_subitem: item.id,
                  paginate:{
                    prev: prev,
                    next: next
                  }
                })
              }else {
                this.props.set404(true)
              }
            }else {
              this.props.set404(true)
            }
          }else {
            this.props.set404(true)
          }
        }else {
          let content = menu.filter(m => m.content == this.props.slug)[0];
          if(content != undefined) {
            let next = null
            if(menu[menu.indexOf(content)+1] != undefined) {
              if(menu[menu.indexOf(content)+1].type == 'simple') {
                next = "/documentacion/"+menu[menu.indexOf(content)+1].content
              }else {
                if(menu[menu.indexOf(content)+1].items[0] != undefined) {
                  next = "/documentacion/"+menu[menu.indexOf(content)+1].content+'&'+menu[menu.indexOf(content)+1].items[0].content
                }
              }
            }
            let prev = null
            if(menu[menu.indexOf(content)-1] != undefined) {
              if(menu[menu.indexOf(content)-1].type == 'simple') {
                prev = "/documentacion/"+menu[menu.indexOf(content)-1].content
              }else {
                if(menu[menu.indexOf(content)-1].items[menu[menu.indexOf(content)-1].items.length - 1] != undefined) {
                  prev = "/documentacion/"+menu[menu.indexOf(content)+1].content+'&'+menu[menu.indexOf(content)-1].items[menu[menu.indexOf(content)-1].items.length - 1].content
                }
              }
            }
            this.props.onSelect({
              file: content.id+'_'+content.content+'.json',
              title: content.title,
              subtitle: null,
              keywords: content.keywords,
              type: 'item', 
              id: content.id,
              id_subitem: null,
              paginate:{
                prev: prev,
                next: next
              }
            })
          }else {
            this.props.set404(true)
          }
        }
      }else {
        let item = menu[0]
        if (item != undefined) {
          if(item.type == 'simple') {

            let next = null
            if(menu[1] != undefined) {
              if(menu[1].type == 'simple') {
                next = "/documentacion/"+menu[1].content
              }else {
                if(menu[1].items[0] != undefined) {
                  next = "/documentacion/"+menu[1].content+'&'+menu[1].items[0].content
                }
              }
            }

            this.props.onSelect({
              file: item.id+'_'+item.content+'.json',
              title: item.title,
              subtitle: null,
              keywords: item.keywords,
              type: 'item', 
              id: item.id,
              id_subitem: null,
              paginate:{
                prev: null,
                next: next
              }
            })
          }else {
            if('items' in item) {
              let subitem = item.items[0]
              if(subitem != undefined) {
                let next = null
                if(item.items[1] != undefined) {
                  next = "/documentacion/"+item.content+'&'+item.items[1].content
                }else {
                  if(menu[1] != undefined) {
                    if(menu[1].type == 'simple') {
                      next = "/documentacion/"+menu[1].content
                    }else {
                      if(menu[1].items[0] != undefined) {
                        next = "/documentacion/"+menu[1].content+'&'+menu[1].items[0].content
                      }
                    }
                  }
                }
                this.props.onSelect({
                  file: subitem.id+'_'+subitem.content+'.json',
                  title: item.title,
                  subtitle: subitem.title,
                  keywords: subitem.keywords,
                  type: 'subitem', 
                  id: item.id,
                  id_subitem: subitem.id,
                  paginate:{
                    prev: null,
                    next: next
                  }
                })
              }
            }
          }
        }
      }
      this.setState({menu: menu, loading: false})
    })
  }
  setSubitemLink = (e) => {
    e.preventDefault();
    post({
      action: 'set_item_menu',
      type: 'subitem',
      title: e.target.title.value,
      id: e.target.id_parent.value
    }).then(data =>  {
      if(data.status) {
        let menu = this.state.menu
        menu = menu.map(item => {
          if(item.id == e.target.id_parent.value) {
            item.items.push(data.data)
          }
          return item
        })
        this.setState({menu: menu, link: ''});
      }
    })
  }
  setItem = (e) => {
    e.preventDefault()
     post({
      action: 'set_item_menu',
      type: (this.state.desplegable) ? 'desplegable' : 'item',
      title: this.state.item,
    }).then(data =>  {
      if(data.status) {
        let menu = this.state.menu
        menu.push(data.data)
        this.setState({menu: menu, item: '', desplegable: false});
      }
    })
  }
  deleteItem(id, type) {
    window.confirm('¿Realmente desea eliminar este item del menu?', () => {
      post({
        action: 'delete_item_menu',
        type: type,
        id: id,
      }).then(data =>  {
        if(data.status) {
          let menu = this.state.menu
          menu = menu.filter(item => item.id != id)
          this.setState({menu: menu});
        }
      })
    })
  }
  deleteSubItem(id_parent, id) {
    window.confirm('¿Realmente desea eliminar este item del menu?', () => {
      post({
        action: 'delete_item_menu',
        type: 'subitem',
        id_parent: id_parent,
        id: id,
      }).then(data =>  {
        if(data.status) {
          let menu = this.state.menu
          menu = menu.map(items => {
            if(items.id == id_parent) {
              items.items = items.items.filter(subitem => subitem.id != id) 
            }
            return items;
          })
          this.setState({menu: menu});
        }
      })
    })
  }
  render() {
    return (
      <>
        <a 
          href="#"
          style={{backgroundColor: this.props.primario, borderColor: this.props.color}} 
          className={`btn-show-menu ${this.state.active ? "active" : ""}`}
          onClick={(e) => {
          e.preventDefault()
          this.setState({active: !this.state.active})
        }}>
          <span style={{backgroundColor: this.props.color}}></span>
          <span style={{backgroundColor: this.props.color}}></span>
          <span style={{backgroundColor: this.props.color}}></span>
        </a>
        <aside className={`menu-left ${this.state.active ? "active" : ""}`}>
          {this.state.loading ? (<Loader repeat={15} />) : (
            <>
              {this.state.menu.map((item, i) => {
                if(item.type == 'simple') {
                  return (
                    <div className={`${(this.props.active == (item.id+'_'+item.content+'.json')) ? "active" : ""} simple big`} key={item.id}>
                      {this.props.admin && (<a href="#" className="delete" onClick={() => this.deleteItem(item.id, 'item')}>x</a>)}
                      <a href="#" onClick={(e) => {
                        e.preventDefault()
                        this.setState({active: false})
                        let prev = null
                        if(this.state.menu[i - 1] != undefined) {
                          if(this.state.menu[i - 1].type == 'simple') {
                            prev = "/documentacion/"+this.state.menu[i - 1].content
                          }else {
                            if(this.state.menu[i - 1].items[this.state.menu[i - 1].items.length - 1] != undefined) {
                              prev = "/documentacion/"+this.state.menu[i - 1].content+'&'+this.state.menu[i - 1].items[this.state.menu[i - 1].items.length - 1].content
                            }
                          }
                        }
                        let next = null
                        if(this.state.menu[i + 1] != undefined) {
                          if(this.state.menu[i + 1].type == 'simple') {
                            next = "/documentacion/"+this.state.menu[i + 1].content
                          }else {
                            if(this.state.menu[i + 1].items[0] != undefined) {
                              next = "/documentacion/"+this.state.menu[i + 1].content+'&'+this.state.menu[i + 1].items[0].content
                            }
                          }
                        }
                        this.props.onSelect({
                          file: item.id+'_'+item.content+'.json',
                          title: item.title,
                          subtitle: null,
                          keywords: item.keywords,
                          type: 'item', 
                          id: item.id,
                          id_subitem: null,
                          paginate:{
                            prev: prev,
                            next: next
                          }
                        })
                        window.history.pushState(null, "", item.content);
                      }}>{item.title}</a>
                    </div>
                  )
                }else {
                  return (
                    <details key={item.id}>
                      <summary style={{borderColor: this.props.colorBorder}}>
                      {this.props.admin && (<a href="#" className="delete" onClick={() => this.deleteItem(item.id, 'desplegable')}>x</a>)}
                        {item.title}
                      </summary>
                      <div style={{paddingLeft: 10}}>
                        {item.items.map((subitem) => (
                          <div className={`${(this.props.active == (subitem.id+'_'+subitem.content+'.json')) ? "active" : ""} simple`} key={String(item.id+'_'+subitem.id)}>
                            {this.props.admin && (<a href="#" className="delete" onClick={() => this.deleteSubItem(item.id, subitem.id)}>x</a>)}
                            <a onClick={(e) => {
                              e.preventDefault()
                              this.setState({active: false})
                              let prev = null
                              if(this.state.menu[i - 1] != undefined) {
                                if(this.state.menu[i - 1].type == 'simple') {
                                  prev = "/documentacion/"+this.state.menu[i - 1].content
                                }else {
                                  if(this.state.menu[i - 1].items[this.state.menu[i - 1].items.length - 1] != undefined) {
                                    prev = "/documentacion/"+this.state.menu[i - 1].content+'&'+this.state.menu[i - 1].items[this.state.menu[i - 1].items.length - 1].content
                                  }
                                }
                              }
                              let next = null
                              if(this.state.menu[i + 1] != undefined) {
                                if(this.state.menu[i + 1].type == 'simple') {
                                  next = "/documentacion/"+this.state.menu[i + 1].content
                                }else {
                                  if(this.state.menu[i + 1].items[0] != undefined) {
                                    next = "/documentacion/"+this.state.menu[i + 1].content+'&'+this.state.menu[i + 1].items[0].content
                                  }
                                }
                              }
                              this.props.onSelect({
                                file: subitem.id+'_'+subitem.content+'.json',
                                title: item.title,
                                subtitle: subitem.title,
                                keywords: subitem.keywords,
                                type: 'subitem', 
                                id: item.id,
                                id_subitem: subitem.id,
                                paginate:{
                                  prev: prev,
                                  next: next
                                }
                              })
                              window.history.pushState(null, "", item.content+'&'+subitem.content);
                            }} href="#">{subitem.title}</a>
                          </div>
                        ))}
                        {this.props.admin && (
                          <form className="add-item" onSubmit={this.setSubitemLink}>
                            <input type="hidden" name="id_parent" value={item.id} />
                            <input type="text" name="title" placeholder="Agregar item" value={this.state.link} onChange={(e) => this.setState({link: e.target.value})}/>
                            <button>❯</button>
                          </form>
                        )}
                      </div>
                    </details>
                  )
                }
              })}
            </>
          )}
          {this.props.admin && (
            <form className="add-item-2" onSubmit={this.setItem}>
              <input type="text" name="title" placeholder="Agregar item.." value={this.state.item} onChange={(e) => this.setState({item: e.target.value})}/>
              <label className="toggle">
                <span>Item / Desplegable</span>
                <Switch 
                      onChange={(c) =>  this.setState({desplegable: c})} 
                      checked={this.state.desplegable} 
                      onColor="#42da00"
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={15}
                      width={30}
                    />
              </label>
              <button>Agregar</button>
            </form>
          )}
        </aside>
      </>
    )
  }
}