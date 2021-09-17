const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			light_blue: '#4a7cff',
			darker_blue: '#1b57f3',
			body_blue: '#000613',
			header_blue: '#16213E',
			component_blue_full: '#21293E',
			component_blue: 'rgba(33, 41, 62, 0.5)',
			text_placeholder: '#C4C4C4',
			dark_blue: '#001439',
			header_border_blue: '#283A68',
			component_secondary: 'rgba(33, 46, 82, 0.1)',
			component_core: '#212E52',
			component_secondary_dark: 'rgba(33, 46, 82, 0.5)',
			outline_blue: '#7DACF9',
			...colors
		},
		extend: {
			fontFamily: {
				poppins_medium: "'Poppins Medium'",
				poppins_head: "'Poppins Head'",
				poppins_subtext: "'Poppins Subtext'"
			}
		}
	},
	variants: {
		extend: {
			width: ['responsive', 'hover', 'focus']
		}
	},
	plugins: []
}
