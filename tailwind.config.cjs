/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				mobile : '500px',
				tablet : '800px',
				laptop : '950px'
			},
			maxWidth: {
				'8xl': '90rem'
			},
			animation: {
				'loading-fast': '0.45s linear 0s infinite normal none running loading-fast'
			},
			keyframes: {
				'loading-fast': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			fontFamily: {
				nunito: ['Gabarito'],
				oxygen: ['Inter'],
				code: ['"Source Code Pro"'],
				gabarito: ['Gabarito'],
				inter: ['Inter']
			},
			colors: {
				charcoal: '#101820',
				primary: '#13A6C7',
				secondary: '#4fd1c5',
				codemirror: '#2d2f3f',
				error: '#E63946',
				discord: '#5865F2',
				text :{
					'1-dark' : '#222222',
					'1-light' : '#e6e6e6',
					'2-dark' : '#1f1f1f',
					'2-light' : '#cccccc',
					'3-dark' : '#191919',
					'3-light' : '#a6a6a6',
					'4-dark': '#303030',
					'4-light' : '#303030',
					'translucent-dark' : '#000000b3',
					'translucent-light' : '#ffffffe6',
				},
				back : {
					'1-light' : '#ffffff',
					'1-dark' : '#1a1a1a',
					'2-light' : '#ffffff',
					'2-dark' : '#2e2e2e',
					'3-light' : '#f7fafd',
					'3-dark' : '#333333',
					'4-light' : '#e5eef5',
					'4-dark' : '#383838',
					'5-light' : '#c2cdd6',
					'5-dark' : '#666666',
				},
				theme : {
					'1-light' : '#ff4000',
					'1-dark' : '#ff531a',
					'2-light' : '#676779',
					'2-dark' : '#676779',
					'3-light' : '#42b4ff',
					'3-dark' : '#42b4ff',
					'4-light' : '#1abbe0',
					'4-dark' : '#1abbe0',
					'5-light' : '#d9d9d9',
					'5-dark' : '#ffffff33',
				}
			}
		},
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		animatedSettings: {
			animatedSpeed: 1000,
			heartBeatSpeed: 500,
			hingeSpeed: 2000,
			bounceInSpeed: 750,
			bounceOutSpeed: 750,
			animationDelaySpeed: 500,
			classes: ['bounce', 'heartBeat', 'fade']
		}

	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animatecss'), require('tailwind-animatecss')]
};
