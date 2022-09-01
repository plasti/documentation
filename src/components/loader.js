function Loader(props) {
	if(props.repeat) {
		let loaders = []
		for (let i = 0; i < props.repeat; i++){
	      loaders.push(<div className="loader-item" {...props}></div>)
	    }
		return (
			<>
				{loaders}
			</>
		)
	}else {
		return (<div className="loader-item" {...props}></div>)
	}

}

export default Loader