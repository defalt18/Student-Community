import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export function useDebouncedValue(value, delay) {
	const [_value, setValue] = useState(value)
	const debouncedSetter = debounce(setValue, delay)

	useEffect(() => {
		debouncedSetter(value)
		return () => debouncedSetter.cancel()
	}, [value])

	return _value
}
