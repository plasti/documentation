import React from 'react';
import {motion} from 'framer-motion';

export default function Modal(props) {
	if(props.active) {
		return (
			<motion.div 
		        initial={{opacity: 0}}
		        animate={{opacity: 1}}
		        exit={{opacity: 0}}
		        className="modal">
				<a href="#" className="cerrar" onClick={(e) => {
					e.preventDefault()
					props.onClose()
				}}></a>
		        <motion.div 
		          initial={{opacity: 0, scale: 0.8, y: 60}}
		          animate={{opacity: 1, scale: 1, y: 0}}
		          exit={{opacity: 0, scale: 0.8, y: 60}}
		          className="body-modal" style={{position: 'relative'}}
		        >
		          {props.children}
		        </motion.div>
	        </motion.div>
		)
	}
}