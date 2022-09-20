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
        index: null,
        type: data.type,
        content: btoa(data.html),
        file: data.file,
        lang: data.lang,
        tag_lang: data.tag_lang
      })
      this.setState({content})
    }else {
      alert('Selecciona una pagina')
    }
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
  render() {
    return (
      <div className="contiainer-content">
        {/*Menu*/}
        <Aside 
          colorBorder={this.props.config.terciario} 
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
                          <a href="#" className="icon-up"></a>
                          <a href="#" className="icon-down"></a>
                          <a href="#" className="icon-edit"></a>
                          <a href="#" className="icon-trash" onClick={() => this.remove(item.id, item.file)}></a>
                        </div>
                        {(item.type != 'code') ? (<div dangerouslySetInnerHTML={{__html: atob(item.content)}}></div>) : (
                          <div className="editor-code" data-color-mode="dark">
                            <span className="lang-tag">{item.tag_lang}</span>
                            <a href="#" className="copy" onClick={(e) => {
                              e.preventDefault();
                              navigator.clipboard.writeText(atob(item.content))
                              alert('¡Copiado!')
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
                            navigator.clipboard.writeText(atob(item.content))
                            alert('¡Copiado!')
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

              {this.state.new_block == 'text' && (
                <Editor onInsert={html => this.insert({type: 'text', html: html})}/>
              )}

              {this.state.new_block == 'imagen' && (
                <Imagen onInsert={(data, file) => this.insert({type: 'imagen', html: data, file: file})}/>
              )}

              {this.state.new_block == 'video' && (
                <Video onInsert={(html) => this.insert({type: 'video', html: html})}/>
              )}

              {this.state.new_block == 'code' && (
                <Code onInsert={(data) => this.insert({type: 'code', html: data.code, lang: data.lang, tag_lang: data.tag_lang})}/>
              )}
            </>
          )}  
        </section>
        {this.props.admin && (
          <Admin 
            active={this.state.new_block}
            changeBlock={(block) => this.setState({new_block: block})}
            save={() => this.saveContent()}
            navigate={(ruta) => this.props.navigate(ruta)}
          />
        )}
      </div>
    )
  }
}

export default withParams(Documentacion)