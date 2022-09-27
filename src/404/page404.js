export default function Page404(props) {
	return (
		<div className="home" style={{background: props.config.primario}}>
	      <div className="ancho">
	        <h1 style={{color: props.config.secundario}}>404</h1>
	        <h2 style={{color: props.config.secundario}}>No encontramos lo que buscas</h2>
	        <div className="btns">
	          <a href="#" onClick={(e) => {e.preventDefault(); props.navigate('/')}} className="btn" style={{color: props.config.primario, backgroundColor: props.config.terciario}}>Ir al inicio</a>
	        </div>
	      </div>
	    </div>
	)
}