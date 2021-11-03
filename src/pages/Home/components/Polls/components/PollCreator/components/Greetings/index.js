import React from 'react'
import { Smiley } from 'components/Icons'

function Greetings() {
	return (
		<>
			<Smiley />
			<p className='prompt-h2 text-outline_blue mt-8 mb-3'>Yayy!!</p>
			<p className='prompt-h4 text-white'>Poll successfully uploaded</p>
			<p className='text-secondary-03 text-outline_blue'>
				Your poll is in review and will get approved shortly
			</p>
		</>
	)
}

export default Greetings
