import React from 'react'
import { default as Editor } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

function TextEditor(props) {
	const { defaultValue, value, ...rest } = props
	const placeholder = React.useMemo(
		() => ({
			ops: [{ insert: defaultValue }]
		}),
		[defaultValue]
	)
	return <Editor theme='bubble' {...rest} defaultValue={placeholder} />
}

export default React.memo(TextEditor)
