import React, { useState } from 'react'
import { useToggle } from 'react-use'
import PageLoader from 'components/PageLoader'
import Button from 'components/Button'
import { useFormik } from 'formik'
import { VIEWS } from '../../types'
import _isEmpty from 'lodash/isEmpty'
import 'react-datepicker/dist/react-datepicker.css'
import DragAndDrop from './components/DragAndDrop'
import DateTimePicker from './components/DateTimePicker'

const validate = (values) => {
	const errors = {}

	if (_isEmpty(values.eventName)) errors.eventName = 'Required'

	if (_isEmpty(values.venue)) errors.eventName = 'Required'

	if (values.endTime === 0)
		errors['endTime'] = 'Please fill in the proper date & time'
	if (values.startTime === 0)
		errors['startTime'] = 'Please fill in the proper date & time'
	if (values.endDate === 0)
		errors['endDate'] = 'Please fill in the proper date & time'
	if (values.startDate === 0)
		errors['startDate'] = 'Please fill in the proper date & time'

	return errors
}

function Creator(props) {
	const { userdata, toggle, toggleView } = props
	const [loading, toggleLoading] = useToggle(false)
	const [poster, setPoster] = useState('')

	const eventData = React.useMemo(
		() => ({
			creator: {
				name: userdata?.username,
				image: userdata?.image,
				uid: userdata?.NO_ID_FIELD
			},
			creatorId: userdata.NO_ID_FIELD,
			eventName: '',
			attendees: 0,
			performance: {},
			deadline: 0,
			endTime: 0,
			endDate: 0,
			startDate: 0,
			startTime: 0,
			venue: '',
			link: '',
			timestamp: Date.now()
		}),
		[userdata]
	)

	const registration = useFormik({
		initialValues: eventData,
		validate,
		onSubmit: async (values) => {
			toggleLoading()
			console.log({ ...values, poster })
			toggleView(VIEWS.Greetings)
		}
	})

	if (loading) return <PageLoader type='loading' />

	return (
		<>
			<div className='flex justify-between items-center pb-4 w-full outline-none border-b border-component_core'>
				<p className='prompt-text text-white'>Add Event</p>
				<Button
					variant='outline'
					text='Discard'
					className='px-6'
					callback={toggle}
				/>
			</div>
			<input
				name='eventName'
				placeholder='Event name*'
				value={registration.values.eventName}
				onChange={registration.handleChange}
				className='rounded p-2 text-secondary text-secondary text-white bg-header_blue w-full mt-3 outline-none'
			/>
			<div className='flex gap-x-3 mt-3 w-full'>
				<DateTimePicker
					placeholderText='Start date'
					variant='DATE'
					onChange={registration.handleChange}
					name='startDate'
				/>
				<DateTimePicker
					placeholderText='Start time'
					variant='TIME'
					onChange={registration.handleChange}
					name='startTime'
				/>
			</div>
			<div className='flex gap-x-3 mt-3 w-full'>
				<DateTimePicker
					placeholderText='End date'
					variant='DATE'
					onChange={registration.handleChange}
					name='endDate'
				/>
				<DateTimePicker
					placeholderText='End time'
					variant='TIME'
					onChange={registration.handleChange}
					name='endTime'
				/>
			</div>
			<input
				name='venue'
				placeholder='Venue'
				value={registration.values.venue}
				onChange={registration.handleChange}
				className='rounded p-2 text-secondary text-secondary bg-header_blue w-full mt-3 outline-none text-white'
			/>
			<DateTimePicker
				placeholderText='Deadline (if any)'
				variant='DATE_TIME'
				onChange={registration.handleChange}
				name='deadline'
			/>
			<input
				name='link'
				placeholder='Link to register (if any)'
				value={registration.values.link}
				onChange={registration.handleChange}
				className='rounded p-2 text-secondary text-secondary text-white bg-header_blue w-full mt-3 outline-none'
			/>
			<p className='text-secondary-03 text-white self-start mt-3'>
				Add A4 size poster of your event
			</p>
			<DragAndDrop poster={poster} setPoster={setPoster} />
			<Button
				variant='filled'
				className='font-bold py-3 px-6 mt-12'
				text='Upload Event'
				type='submit'
				callback={registration.handleSubmit}
			/>
		</>
	)
}

export default React.memo(Creator)
