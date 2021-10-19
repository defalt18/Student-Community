import React, { useState } from 'react'
import Creator from './components/Creator'
import Greetings from './components/Greetings'
import { VIEWS } from './types'

function CreatePostDialog(props) {
	const { toggle, userdata } = props
	const [view, toggleView] = useState(VIEWS.Creation)

	const renderContent = () => {
		switch (view) {
			case VIEWS.Creation:
				return (
					<Creator
						userdata={userdata}
						toggle={toggle}
						toggleView={toggleView}
					/>
				)

			case VIEWS.Success:
				return <Greetings />

			default:
				return null
		}
	}
	return (
		<div className='rounded bg-body_blue p-8 flex flex-col items-center border border-outline_blue border-opacity-40 w-525'>
			{renderContent()}
		</div>
	)
}

export default React.memo(CreatePostDialog)
