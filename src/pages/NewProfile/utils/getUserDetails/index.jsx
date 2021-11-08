import { BooksIcon, LocationIcon, PersonIcon, StarIcon } from 'components/Icons'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import React from 'react'
import _keys from 'lodash/keys'

export function getUserDetails(role, content) {
	switch (role) {
		case 'Individual':
			const {
				firstName,
				lastName,
				city,
				country,
				batch,
				course,
				skills,
				degree
			} = content
			return (
				<>
					<p className='text-secondary text-outline_blue self-start my-2'>
						ABOUT
					</p>
					<div className='flex flex-col gap-y-2 self-start mt-2'>
						<div className='flex flex-row'>
							<div className='w-8 flex flex-col items-center'>
								<PersonIcon fill='#fff' />
							</div>
							<p className='text-secondary text-white'>
								{firstName} {lastName}
							</p>
						</div>
						<div className='flex flex-row'>
							<div className='w-8 flex flex-col items-center'>
								<LocationIcon fill='#fff' />
							</div>
							<p className='text-secondary text-white'>
								{city}, {country}
							</p>
						</div>
						<div className='flex flex-row'>
							<div className='w-8 flex flex-col items-center'>
								<BooksIcon fill='#fff' />
							</div>
							<p className='text-secondary text-white'>
								{degree} | {course} | {batch} Batch
							</p>
						</div>
						{_isEmpty(skills) ? null : (
							<div className='flex flex-row'>
								<div className='w-8 flex flex-col items-center'>
									<StarIcon fill='#fff' />
								</div>
								<p className='text-secondary text-white'>
									{_map(skills, (skill) => (
										<p key={skill}>{skill}</p>
									))}
								</p>
							</div>
						)}
					</div>
				</>
			)
		case 'Club':
			const { coreDetails } = content
			return (
				<>
					<p className='text-secondary text-outline_blue self-start my-2'>
						CORE DETAILS
					</p>
					<div className='flex flex-col gap-y-2 self-start mt-2'>
						{_map(_keys(coreDetails), (member) => (
							<p className='text-secondary text-white'>
								{coreDetails[member].firstName} {coreDetails[member].lastName}
							</p>
						))}
					</div>
				</>
			)

		default:
			return null
	}
}
