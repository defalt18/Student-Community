const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			body_blue: '#00081C',
			header_blue: '#1B2642',
			component_blue: 'rgba(49,55,69,0.5)',
			text_placeholder: '#C4C4C4',
			dark_blue: '#001439',
			...colors
		},
		extend: {
			fontFamily: {
				poppins_medium: "'Poppins Medium'",
				poppins_head: "'Poppins Head'",
				poppins_subtext: "'Poppins Subtext'"
			},
			gridTemplateRows: {
			   'layout-1': 'auto calc(100vh - 60px)',
			},
			gridTemplateColumns: {
				'layout-2': 'auto 1fr auto',
			 }
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
