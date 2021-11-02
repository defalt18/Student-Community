import React, { useState } from 'react'
import { VIEWS } from '../../types'
import Greetings from './components/Greetings'
import Creator from './components/Creator'

function PollCreator(props) {
	const { toggle: closeModal, userdata } = props
	const [view, setView] = useState(VIEWS.Creation)

	const renderContent = () => {
		switch (view) {
			case VIEWS.Creation:
				return (
					<Creator
						userdata={userdata}
						toggleView={setView}
						toggle={closeModal}
					/>
				)

			case VIEWS.Greetings:
				return <Greetings />

			default:
				return null
		}
	}

	return (
		<div className='rounded bg-body_blue p-8 flex flex-col items-center outline-none border border-outline_blue border-opacity-40 w-525'>
			{renderContent()}
		</div>
	)
}

export default PollCreator
