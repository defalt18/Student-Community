import React, { useCallback, useState } from 'react'
import DatePicker from 'react-datepicker'
import { CalendarIcon, ClockIcon } from 'components/Icons'

const VARIANTS = {
	date: 'DATE',
	time: 'TIME',
	dateTime: 'DATE_TIME'
}

function DateTimePicker(props) {
	const { onChange, variant = VARIANTS.date, placeholderText, name } = props
	const [date, setDate] = useState(null)
	const handleDateChange = useCallback(
		(date) => {
			setDate(date)
			onChange({ target: { value: date, name } })
		},
		[setDate, onChange, name]
	)

	switch (variant) {
		case VARIANTS.date:
			return (
				<div className='bg-header_blue flex-1 w-full text-white outline-none p-2 rounded flex items-center'>
					<DatePicker
						value={date}
						placeholderText={placeholderText}
						selected={date}
						onChange={handleDateChange}
						className='text-white outline-none bg-header_blue w-full'
					/>
					<div>
						<CalendarIcon fill='#fff' />
					</div>
				</div>
			)

		case VARIANTS.time:
			return (
				<div className='bg-header_blue flex-1 w-full text-white outline-none p-2 rounded flex items-center'>
					<DatePicker
						value={date}
						placeholderText={placeholderText}
						selected={date}
						onChange={handleDateChange}
						className='text-white outline-none bg-header_blue'
						showTimeSelect
						autoComplete
						showTimeSelectOnly
						timeIntervals={1}
						timeCaption='Time'
						dateFormat='h:mm aa'
					/>
					<div>
						<ClockIcon fill='#fff' />
					</div>
				</div>
			)

		case VARIANTS.dateTime:
			return (
				<div className='bg-header_blue flex-1 w-full text-white outline-none p-2 rounded flex items-center mt-3'>
					<DatePicker
						value={date}
						placeholderText={placeholderText}
						selected={date}
						showTimeSelect
						onChange={handleDateChange}
						dateFormat='MMMM d, yyyy h:mm aa'
						className='text-white outline-none w-full bg-header_blue'
					/>
					<div>
						<CalendarIcon fill='#fff' />
					</div>
				</div>
			)

		default:
			return null
	}
}

export default React.memo(DateTimePicker)
