import React from 'react';
import {post, url, id} from '../utiles';
import Aside from '../components/aside'
import Editor from '../components/editor'
import Imagen from '../components/imagen'
import Video from '../components/video'
import Code from '../components/code'
import Admin from '../components/admin'
import Modal from '../components/modal';
import CodeEditor from '@uiw/react-textarea-code-editor';
import withParams from '../utiles/withparams';
import { NavLink } from "react-router-dom";

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

class Documentacion extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: [],
      new_block: '',
      file: null,
      files_delete: [],
      title: null,
      subtitle: null,
      keywords: null,
      type: null,
      id: null,
      id_subitem: null,
      modal_keywords: false,
      page404: false, 
      can_view: false,
      code_login: false,
      code: '',
      // -------
      id_editing: null,
      content_editing: null,
      lang: null,
      tag_lang: null, 
      prev: null,
      next: null,
    }
  }
  componentDidMount() {
    if(this.props.config.code_login != '' && this.props.config.code_login != null) {
      let code = localStorage.getItem('@xcoxde_xloxgin')
      if(atob(code) == atob(this.props.config.code_login)) {
        this.setState({can_view: true, code_login: false})
      }else {
        this.setState({can_view: false, code_login: true})
      }
    }else {
      this.setState({can_view: true, code_login: false})
    }
  }

  setCode(code) {
    if(code == atob(this.props.config.code_login)) {
      localStorage.setItem('@xcoxde_xloxgin', btoa(code))
      this.setState({
        can_view: true,
        code_login: false,
        code: ''
      })
    }else {
      this.setState({code: code})
    }
  }


  saveKeywords() {
    post({
      action: 'set_keywords',
      type: this.state.type,
      id: this.state.id,
      id_subitem: this.state.id_subitem,
      keywords: this.state.keywords
    }).then(data => {
      if(data.status) {
        this.setState({modal_keywords: false})
      }
    })
  }
  getContent(datos) {
    post({action: 'get_content', file: datos.file}).then(data => {
      if("content" in data) {
        this.setState({
          content: data.content,
          file: datos.file,
          title: datos.title,
          subtitle: datos.subtitle,
          keywords: datos.keywords,
          type: datos.type,
          id: datos.id,
          id_subitem: datos.id_subitem,
          prev: datos.paginate.prev,
          next: datos.paginate.next,
          page404: false,
        })
      }else {
        console.log(data)
      }
    })
  }
  saveContent() {
    post({
      action: 'set_content', 
      file: this.state.file,
      content: this.state.content,
      files_delete: this.state.files_delete
    }).then(data => {
      if(this.state.files_delete.length > 0) {
      }else {
        alert('¡Guardado!')
      }
    })
  }
  insert(data) {
    if(this.state.file != null) {
      let content = this.state.content
      content.push({
        id: id(),
        type: data.type,
        content: btoa(data.html),
        file: data.file,
        lang: data.lang,
        tag_lang: data.tag_lang
      })
      this.setState({content: content, new_block: ''})
    }else {
      alert('Selecciona una pagina')
    }
  }
  update(data) {
    let content = this.state.content
    let index = content.findIndex(i => i.id == this.state.id_editing)
    content[index].content = btoa(data.html)
    if("file" in data) {
      content[index].file = data.file
    }
    if("lang" in data) {
      content[index].lang = data.lang
    }
    if("tag_lang" in data) {
      content[index].tag_lang = data.tag_lang
    }
    this.setState({content: content, id_editing: null, new_block: null, content_editing: null, lang: null, tag_lang: null})
  }

  remove(id, file = null) {
    let content = this.state.content
    content = content.filter(c => c.id != id);
    if(file != null && file != undefined) {
      let files = this.state.files_delete
      files.push(file)
      this.setState({files_delete: files})
    }
    this.setState({content})
  }
  moveUp(id) {
    let content = this.state.content
    let index = content.findIndex(i => i.id == id)
    if(index == 0) {
      alert('No se puede mover más arriba', 'info')
    }else {
      content.move(index, index - 1)
      this.setState({content: content})
    }
  }
  moveDown(id) {
    let content = this.state.content
    let index = content.findIndex(i => i.id == id)
    if(index == content.length - 1) {
      alert('No se puede mover más abajo', 'info')
    }else {
      content.move(index, index + 1)
      this.setState({content: content})
    }
  }

  render() {
    return (
      <div className="contiainer-content">
        {/*Menu*/}
        <Aside 
          colorBorder={this.props.config.terciario} 
          color={this.props.config.secundario} 
          primario={this.props.config.primario} 
          admin={this.props.admin} 
          active={this.state.file}
          slug={this.props.params.item}
          set404={(v) => this.setState({page404: v})}
          onSelect={(data) => this.getContent(data)}
        />

        {/*modal palabras clave*/}
        <Modal active={this.state.modal_keywords} onClose={() => this.setState({modal_keywords: false})}>
          <h2>Palabras clave para este contenido</h2>
          <textarea onChange={(e) => this.setState({keywords: e.target.value})} defaultValue={this.state.keywords}></textarea>
          <div className="btns">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              this.setState({modal_keywords: false})
            }}>Cancelar</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              this.saveKeywords()
            }}>Guardar</a>
          </div>
        </Modal>

        {/*Contenido*/}
        {this.state.can_view && (
          <section className="content">   
            <div className="migas">
              <div>
                <span>Documentación</span>
                {this.state.title != null && (<span> ❯ {this.state.title}</span>)}
                {this.state.subtitle != null && (<span> ❯ {this.state.subtitle}</span>)}
              </div>
              {this.props.admin && (
                <div>
                  {this.state.title != null && (<a href="#" className="keywords" onClick={(e) => {
                    e.preventDefault();
                    this.setState({modal_keywords: true})
                  }}>Palabras clave para este contenido</a>)}
                </div>
              )}
            </div>

            {this.state.page404 ? (
              <>
                <span className="nothing" style={{fontSize: '10rem', display: 'block', textAlign: 'center'}}>404.</span>
                <span className="nothing" style={{display: 'block', textAlign: 'center'}}>No se encontró contenido.</span>
              </>
            ): (
              <>
                {this.state.content.length == 0 && (
                  <span className="nothing">Sin contenido.</span>
                )} 
                {this.state.content.map(item => {
                  if(this.props.admin) {
                      return (
                        <div className="block-edit" key={item.id}>
                          <div className="access-btn">
                            <a href="#" className="icon-up" onClick={(e) => {
                              e.preventDefault()
                              this.moveUp(item.id)
                            }}></a>
                            <a href="#" className="icon-down" onClick={(e) => {
                              e.preventDefault()
                              this.moveDown(item.id)
                            }}></a>
                            <a href="#" className="icon-edit" onClick={(e) => {
                              e.preventDefault()
                              this.setState({
                                id_editing: item.id,
                                content_editing: item.content,
                                new_block: item.type,
                                lang: item.type == 'code' ? item.lang : null,
                                tag_lang: item.type == 'code' ? item.tag_lang : null,
                              })
                            }}></a>
                            <a href="#" className="icon-trash" onClick={(e) => {
                              e.preventDefault()
                              this.remove(item.id, item.file)
                            }}></a>
                          </div>
                          {(item.type != 'code') ? (<div dangerouslySetInnerHTML={{__html: atob(item.content)}}></div>) : (
                            <div className="editor-code" data-color-mode="dark">
                              <span className="lang-tag">{item.tag_lang}</span>
                              <a href="#" className="copy" onClick={(e) => {
                                e.preventDefault();
                                alert('¡copiado!')
                                navigator.clipboard.writeText(atob(item.content))
                              }}>Copiar</a>
                              <CodeEditor 
                                readOnly={true}
                                value={atob(item.content)} 
                                language={item.lang}
                                padding={17}
                                style={{
                                  fontSize: 17,
                                  backgroundColor: "#303841",
                                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )
                  }else {
                    return (
                      <>
                        {item.type != 'code' ? (
                          <div key={item.id} dangerouslySetInnerHTML={{__html: atob(item.content)}}></div>
                        ) : (
                          <div className="editor-code" data-color-mode="dark">
                            <span className="lang-tag">{item.tag_lang}</span>
                            <a href="#" className="copy" onClick={(e) => {
                              e.preventDefault();
                              alert('¡Copiado!')
                              navigator.clipboard.writeText(atob(item.content))
                            }}>Copiar</a>
                            <CodeEditor
                              readOnly={true} 
                              value={atob(item.content)} 
                              language={item.lang}
                              padding={17}
                              style={{
                                fontSize: 17,
                                backgroundColor: "#303841",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                              }}
                            />
                          </div>
                        )}
                      </>
                    )
                  }
                })}

                
                <Modal active={this.state.new_block != ''} onClose={() => this.setState({new_block: ''})}>
                  {this.state.new_block == 'text' && (
                    <Editor 
                      content={this.state.content_editing}
                      onInsert={html => {
                        if(this.state.id_editing != null) {
                          this.update({html: html})
                        }else {
                          this.insert({type: 'text', html: html})
                        }
                      }}
                    />
                  )}

                  {this.state.new_block == 'imagen' && (
                    <Imagen content={this.state.content_editing} onInsert={(data, file = null) => {
                      if(this.state.id_editing != null) {
                        this.update({html: data})
                      }else {
                        this.insert({type: 'imagen', html: data, file: file})
                      }
                    }}/>
                  )}

                  {this.state.new_block == 'video' && (
                    <Video content={this.state.content_editing} onInsert={(html) => {
                      if(this.state.id_editing != null) {
                        this.update({html: html})
                      }else {
                        this.insert({type: 'video', html: html})
                      }
                    }}/>
                  )}

                  {this.state.new_block == 'code' && (
                    <Code 
                      content={this.state.content_editing} 
                      lang={this.state.lang}
                      tag_lang={this.state.tag_lang}
                      onInsert={(data) => {
                        if(this.state.id_editing != null) {
                          this.update({
                            html: data.code,
                            lang: data.lang,
                            tag_lang: data.tag_lang
                          })
                        }else {
                          this.insert({type: 'code', html: data.code, lang: data.lang, tag_lang: data.tag_lang})
                        }
                    }}/>
                  )}  
                </Modal>
              </>
            )} 

            {(this.state.next != null || this.state.prev != null) && (
              <div className="paginate">
                {this.state.prev != null && (
                  <NavLink style={{backgroundColor: this.props.config.primario, color: this.props.config.secundario}} to={this.state.prev}>❮ Anterior</NavLink>
                )}
                {this.state.next && (
                  <NavLink style={{backgroundColor: this.props.config.primario, color: this.props.config.secundario}} to={this.state.next}>Siguiente ❯</NavLink>
                )}
              </div>
            )}

          </section>
        )}
        {this.state.code_login && (
          <div className="content">
            <div className="require-code">
              <label>Ingresa el código de acceso</label>
              <input type="password" value={this.state.code} style={{borderColor: this.props.config.terciario}} placeholder="####" onChange={(e) => this.setCode(e.target.value)} />
            </div>
          </div>
        )}
        {this.props.admin && (
          <Admin 
            active={this.state.new_block}
            changeBlock={(block) => {
              if(block == '') {
                this.setState({lang: null, tag_lang: null, id_editing: null, content_editing: null})
              }
              this.setState({new_block: block})
            }}
            save={() => this.saveContent()}
            navigate={(ruta) => this.props.navigate(ruta)}
          />
        )}
      </div>
    )
  }
}

export default withParams(Documentacion)