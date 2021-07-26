/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button } from '@material-ui/core'
import './Carousel_signup.css'
// import '../../dark-background.png';

export default function Carousel_signup() {
	var items = [
		{
			name: 'DA-IICT',
			description: 'Sign up to get the most benefits of the enormous network',
			src: 'http://20.185.220.79:8081/gallery/07.jpg'
		},
		{
			// name: 'DA-IICT',
			description: 'A place to be!',
			src: 'https://educationiconnect.com/wp-content/uploads/2020/05/DAIICT-University-Fee-Structure-2020-2021.jpg'
		},
		{
			name: 'DA-IICT',
			description: 'A culture, a vibrance and an intellect',
			src: 'https://images.shiksha.com/mediadata/images/1492513341php1FIK5E.jpeg'
		}
	]

	return (
		<Carousel indicators='' interval='7000'>
			{items.map((item, i) => (
				<Item key={i} item={item} />
			))}
		</Carousel>
	)
}

function Item(props) {
	return (
		<div className='caroMin' id='caro'>
			<img
				className='carimg'
				src={props.item.src}
				alt=''
				style={{ objectFit: 'contain' }}
			/>
			<h1 className='carohading'>{props.item.name}</h1>
			<p className='carodisciption'>{props.item.description}</p>
		</div>
	)
}
