import React from 'react'

function Camera(props) {
	return (
		<svg
			width={39}
			height={39}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<circle cx={19.5} cy={19.5} r={19.5} fill='#E8F0FD' />
			<g
				clipPath='url(#prefix__clip0)'
				stroke='#333'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M28.208 25.833c0 .442-.166.866-.463 1.179-.297.312-.7.488-1.12.488h-14.25c-.42 0-.823-.176-1.12-.488a1.712 1.712 0 01-.463-1.179v-9.166c0-.442.167-.866.463-1.179.297-.312.7-.488 1.12-.488h3.167l1.583-2.5h4.75l1.583 2.5h3.167c.42 0 .823.176 1.12.488.297.313.463.737.463 1.179v9.166z' />
				<path d='M19.5 24.167c1.749 0 3.167-1.493 3.167-3.334 0-1.84-1.418-3.333-3.167-3.333-1.749 0-3.167 1.492-3.167 3.333 0 1.841 1.418 3.334 3.167 3.334z' />
			</g>
			<defs>
				<clipPath id='prefix__clip0'>
					<path fill='#fff' transform='translate(10 10)' d='M0 0h19v20H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default Camera
