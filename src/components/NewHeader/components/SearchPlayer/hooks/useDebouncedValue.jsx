import { useEffect, useState } from 'react'

export function useDebouncedValue(value, delay) {
	const [_value, setValue] = useState(value)
	useEffect(() => {
		const id = setTimeout(() => {
			setValue(value)
		}, delay)
		return () => clearTimeout(id)
	}, [value, delay])
	return _value
}
