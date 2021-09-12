import React from 'react'
import './Sentext.css'
import { Avatar } from '@material-ui/core'

function Texts({ msgs, img }) {
	return (
		<div className='textstyles'>
			<h4>{msgs}</h4>
			<Avatar src={img} fontSize='small' />
		</div>
	)
}

export default Texts
