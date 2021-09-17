import React from 'react'
import c from 'classnames'

const VARIANTS = {
	Student: 'Student',
	Club: 'Club'
}

function Tag(props) {
	const { className, variant = VARIANTS.Student } = props
	switch (variant) {
		case VARIANTS.Student:
			return (
				<div
					className={c(
						'border border-1 border-white bg-outline_blue bg-opacity-50 py-1 px-2 rounded-3xl',
						className
					)}
				>
					<p className='text-tertiary text-white'>Student</p>
				</div>
			)

		case VARIANTS.Club:
			return (
				<div
					className={c(
						'border border-1 border-white bg-green-500 bg-opacity-50 py-1 px-2 rounded-3xl',
						className
					)}
				>
					<p className='text-tertiary text-white'>Club</p>
				</div>
			)

		default:
			return null
	}
}

export default Tag
