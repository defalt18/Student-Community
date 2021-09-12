import React from 'react'
import './Clubdesc.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Link } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'

function Clubdesc({ title, descon, img, id, insta }) {
	function addfollow() {
		var p = document.getElementsByClassName('check')
		// console.log(p[1]);
		if (p[0].style.display === 'none') {
			p[1].style.display = 'none'
			p[0].style.display = 'block'
		} else {
			p[1].style.display = 'block'
			p[0].style.display = 'none'
		}
	}
	return (
		<div className='desclub'>
			<CssBaseline />
			<div className='displ'>
				<div className='contactclu'>
					Contact us :
					<div
						className='infoclu'
						style={{
							fontSize: '28px'
						}}
					>
						<p>Club Member 1</p>
						<p>Club Member 2</p>
						<p>Club Member 3</p>
						<p>Club Member 4</p>
						<p>{id}@daiict.ac.in</p>
					</div>
				</div>
				<img src={img} alt='' />
				<div
					style={{
						color: 'gray',
						display: 'flex',
						top: '4rem',
						// border: '2px solid red',
						position: 'absolute',
						zIndex: '100',
						width: 'calc(100vw - 6rem)',
						alignItems: 'center',
						// padding: '0 2rem',
						paddingRight: '2rem',
						boxSizing: 'content-box'
					}}
				>
					<Link to='/clubs'>
						<ArrowBackIosIcon
							id='back'
							fontSize='large'
							style={{
								alignSelf: 'center'
							}}
						/>
					</Link>
					<Button
						onClick={addfollow}
						style={{
							display: 'flex',
							color: 'black',
							marginLeft: 'auto',
							backgroundColor: 'rgba(255, 255, 255,0.7)',
							backdropFilter: 'blur(10px)',
							borderRadius: '10px',
							height: '2.5rem',
							textTransform: 'none',
							fontSize: 'large',
							padding: '0 0.5rem'
						}}
					>
						<CheckIcon
							className='check'
							style={{
								display: 'none'
							}}
						/>
						<p
							className='check'
							style={{
								margin: '0',
								fontSize: 'large',
								fontWeight: '600'
							}}
						>
							Follow
						</p>
					</Button>
				</div>
				<h1>{title}</h1>
				<p>{descon}</p>
				<span>
					<a href={insta}>
						<InstagramIcon fontSize='large' />
					</a>
					<WhatsAppIcon fontSize='large' />
				</span>
			</div>
		</div>
	)
}

export default Clubdesc
