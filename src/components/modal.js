import React from 'react';

export default function Modal(props) {
	if(props.active) {
		return (
			<div className="modal">
				<a href="#" className="cerrar" onClick={(e) => {
					e.preventDefault()
					props.onClose()
				}}></a>
				<div className="body-modal">
					{props.children}
				</div>
			</div>
		)
	}
}