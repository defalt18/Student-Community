import React, { useCallback } from 'react'
import _noop from 'lodash/noop'
import c from 'classnames'
import { ButtonStyles } from './styles'
import { CircularProgress as Loader } from '@material-ui/core'
import { useToggle } from 'react-use'

function Button(props) {
	const {
		text = 'Click here',
		callback = _noop,
		size,
		awaitResponse = true,
		// loading = false,
		variant = 'standard',
		type,
		className,
		children,
		...buttonProps
	} = props

	const [loading, toggle] = useToggle(false)

	const onClick = useCallback(async () => {
		toggle()
		await callback()
		toggle()
	}, [callback, toggle])

	switch (variant) {
		case 'filled':
			return (
				<button
					type={type}
					onClick={awaitResponse ? onClick : callback}
					className={c(
						ButtonStyles[size],
						'transition-all duration-200 flex items-center gap-x-2 text-secondary button-border text-white bg-gradient-to-r from-light_blue to-darker_blue rounded hover:text-outline_blue',
						className
					)}
					{...buttonProps}
				>
					<span>{text}</span>
					{loading && <Loader color='inherit' size={20} />}
				</button>
			)

		case 'outline':
			return (
				<button
					type={type}
					onClick={onClick}
					className={c(
						'transition-all duration-200 border flex items-center gap-x-2 border-outline_blue text-outline_blue rounded px-4 py-2 hover:bg-outline_blue hover:bg-opacity-10',
						className
					)}
					{...buttonProps}
				>
					<span>{text}</span>
					{loading && <Loader color='inherit' size={20} />}
				</button>
			)

		case 'abort':
			return (
				<button
					type={type}
					onClick={onClick}
					className={c(
						'transition-all duration-200 border flex items-center gap-x-2 border-red_abort text-red_abort rounded hover:bg-red_abort hover:bg-opacity-10',
						className
					)}
					{...buttonProps}
				>
					<span>{text}</span>
					{loading && <Loader color='inherit' size={20} />}
				</button>
			)

		case 'standard':
			return (
				<button
					type={type}
					onClick={onClick}
					className={c(
						'transition-all duration-200 text-white rounded p-1 hover:bg-gray-100 hover:bg-opacity-10',
						className
					)}
					{...buttonProps}
				>
					{children}
				</button>
			)

		default:
			return null
	}
}

export default React.memo(Button)
