import React from 'react';
import {QRCodeCanvas} from 'qrcode.react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {url} from '../utiles';

const l = url.replace('/files', '')
export default function App(props) {
	return (
		<div className="home" style={{background: props.config.primario}}>
          <div className="ancho">
            <h1 style={{color: props.config.secundario}}>Descargar nuestra App móvil</h1>
            <h2 style={{color: props.config.secundario}}>Sigue estos pasos para tener toda la documentación en tu dispositivo móvil</h2>
            <a href="#" className="btn" style={{color: props.config.primario, backgroundColor: props.config.terciario}}>Descargar app</a><br/><br/>
            <ol style={{paddingLeft: 20}}>
            	<li style={{color: props.config.secundario}}>Descarga la app móvil</li>
            	<li style={{color: props.config.secundario}}>Abre la app</li>
            	<li style={{color: props.config.secundario}}>Escanea el siguiente código QR</li>
            </ol>
            <br/>
            <div style={{margin: '50px auto', display: 'block', textAlign: 'center', width: '100%'}}>
            	<QRCodeCanvas 
            		size={250}
            		value={l} 
            	/>
            </div>
            <p style={{color: props.config.secundario}}>( Si no tienes como escanerar el código QR puedes copiar el siguiente enlace y pegarlo dentro de la app en el campo que dice: URL )</p>
            <div className="contiainer-content" style={{width: '100%', margin: 0}}>
	            <div className="content" style={{width: '100%', padding: 0}}>
					<div className="editor-code" data-color-mode="dark">
						<span className="lang-tag">LINK</span>
						<a href="#" className="copy" onClick={(e) => {
							e.preventDefault();
							navigator.clipboard.writeText(l)
							alert('¡Copiado!')
						}}>Copiar</a>
						<CodeEditor
							readOnly={true} 
							value={l} 
							language={'sh'}
							padding={17}
							style={{
								fontSize: 17,
								backgroundColor: "#303841",
								fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
							}}
						/>
					</div>
	            </div>
            </div>
          </div>
        </div>
	)
}