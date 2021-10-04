import React from 'react'
import {
	AcademicIcon,
	EventsIcon,
	HomeIcon,
	PeopleIcon,
	PollsIcon
} from '../Icons'

export const OPTIONS = [
	{
		id: 'home',
		label: 'Home',
		icon: <HomeIcon />
	},
	{
		id: 'academic',
		label: 'Academic',
		icon: <AcademicIcon />
	},
	{
		id: 'clubs',
		label: 'Clubs',
		icon: <PeopleIcon />
	},
	{
		id: 'events',
		label: 'Events',
		icon: <EventsIcon />
	},
	{
		id: 'polls',
		label: 'Polling',
		icon: <PollsIcon />
	}
]

export const classNames = {
	normal: 'flex items-center gap-x-5 text-secondary p-4 rounded mx-4 ',
	active: 'bg-header_blue'
}
