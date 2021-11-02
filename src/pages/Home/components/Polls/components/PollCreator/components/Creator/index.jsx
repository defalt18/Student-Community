import React, { useCallback, useState } from 'react'
import { useToggle } from 'react-use'
import PageLoader from 'components/PageLoader'
import Button from 'components/Button'
import _map from 'lodash/map'
import _values from 'lodash/values'
import _keys from 'lodash/keys'
import _reduce from 'lodash/reduce'
import { requestPoll } from '../../../../../../../../services/poll-utils'
import { VIEWS } from '../../../../types'

const MAX_INPUTS = 5

function Creator(props) {
	const { userdata, toggle, toggleView } = props
	const [loading, toggleLoading] = useToggle(false)
	const [initialInputs, setInputs] = useState(2)
	const [question, setQuestion] = useState('')
	const [allOptions, setOptions] = useState({})

	const pollData = React.useMemo(
		() => ({
			creator: {
				name: userdata?.username,
				image: userdata?.image,
				uid: userdata?.NO_ID_FIELD
			},
			name: '',
			options: [],
			totalVotes: 0,
			performance: {},
			isVerified: false,
			timestamp: Date.now()
		}),
		[userdata]
	)

	const incrementInput = useCallback(() => {
		setInputs((value) => value + 1)
		setOptions({ ...allOptions, [initialInputs + 1]: '' })
	}, [setInputs, initialInputs, allOptions, setOptions])

	const handleOptionAddition = useCallback(
		(_event) => {
			const { value, name } = _event.target
			setOptions({ ...allOptions, [name]: value })
		},
		[setOptions, allOptions]
	)

	const handleQuestionChange = useCallback(
		(_event) => {
			const { value } = _event.target
			setQuestion(value)
		},
		[setQuestion]
	)

	const onUploadPoll = useCallback(async () => {
		const values = _values(allOptions)
		if (values.includes('') > 0)
			alert('Please fill all options in order to proceed')
		else {
			toggleLoading()
			const perf = _reduce(
				_values(allOptions),
				(total, key) => ({ ...total, [key]: 0 }),
				{}
			)
			const poll = {
				...pollData,
				name: question,
				options: values,
				performance: perf
			}
			await requestPoll(poll)
			toggleView(VIEWS.Greetings)
		}
	}, [allOptions, pollData, toggleLoading, question, toggleView])

	if (loading) return <PageLoader type='loading' />

	return (
		<>
			<div className='flex justify-between items-center pb-4 w-full outline-none border-b border-component_core'>
				<p className='prompt-text text-white'>Add Poll</p>
				<Button
					variant='outline'
					text='Discard'
					size='medium'
					callback={toggle}
				/>
			</div>
			<input
				placeholder='Question'
				value={question}
				onChange={handleQuestionChange}
				className='p-2 px-4 bg-header_blue text-secondary-03 text-white rounded my-5 w-full outline-none'
			/>
			<p className='text-white text-secondary-03 font-bold mb-4 w-full'>
				Add options as needed:
			</p>
			<div className='flex flex-col gap-y-4 w-full'>
				{_map(Array(initialInputs).fill(''), (_, index) => (
					<input
						key={index}
						placeholder={`Option ${index + 1}`}
						name={index + 1}
						value={allOptions[index + 1]}
						onChange={handleOptionAddition}
						className='p-2 px-4 bg-header_blue text-secondary-03 text-white rounded outline-none'
					/>
				))}
				{initialInputs < MAX_INPUTS && (
					<div className='flex w-full flex-end'>
						<Button
							variant='outline'
							className='ml-auto px-12 h-7 text-secondary-03'
							text='Add +'
							callback={incrementInput}
						/>
					</div>
				)}
			</div>
			<Button
				variant='filled'
				className='font-bold py-3 px-6 mt-12'
				text='Upload poll'
				callback={onUploadPoll}
			/>
		</>
	)
}

export default Creator
