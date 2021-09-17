import React from 'react'
import _noop from 'lodash/noop'
import c from 'classnames'
import { ButtonStyles } from './styles'

function Button(props) {
	const {
		text = 'Click here',
		callback = _noop,
		size = 'small',
		variant = 'standard',
		className,
		children
	} = props

	switch (variant) {
		case 'filled':
			return (
				<button
					onClick={callback}
					className={c(
						ButtonStyles[size],
						'transition-all duration-200 text-secondary button-border text-white bg-gradient-to-r from-light_blue to-darker_blue rounded hover:text-outline_blue',
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
						'transition-all duration-200 border border-outline_blue text-outline_blue rounded px-4 py-2 hover:bg-outline_blue hover:text-white',
						className
					)}
				>
					{text}
				</button>
			)

		case 'standard':
			return (
				<button
					onClick={callback}
					className={c(
						'transition-all duration-200 text-white rounded p-1 hover:bg-gray-100 hover:bg-opacity-10',
						className
					)}
				>
					{children}
				</button>
			)

		default:
			return null
	}
}

export default Button
