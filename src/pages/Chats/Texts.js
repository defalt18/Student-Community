import React from 'react'
import './Texts.css'
import { Avatar } from '@material-ui/core'

function Texts({ msgs, img }) {
	return (
		<div className='textstyle'>
			<Avatar src={img} fontSize='small' />
			<h4>{msgs}</h4>
		</div>
	)
}

export default Texts
