import React from 'react'
import _noop from 'lodash/noop'
import c from 'classnames'
import { ButtonStyles } from './styles'

function Button(props) {
	const {
		text = 'Click here',
		callback = _noop,
		size = 'small',
		variant = 'filled',
		className = ''
	} = props

	switch (variant) {
		case 'filled':
			return (
				<button
					style={ButtonStyles[size]}
					onClick={callback}
					className={c(
						'transition-all duration-200 text-secondary button-border text-white bg-gradient-to-r from-light_blue to-darker_blue rounded hover:bg-gradient-to-r hover:from-body_blue hover:to-body_blue hover:text-light_blue',
						className
					)}
				>
					{text}
				</button>
			)

		case 'outline':
			return (
				<button
					onClick={callback}
					className={c(
						'text-tertiary-bold border border-outline_blue text-outline_blue rounded px-4 py-2',
						className
					)}
				>
					{text}
				</button>
			)

		default:
			return null
	}
}

export default Button
