module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				body: 'var(--body-bg)',
				default: {
					DEFAULT: 'var(--default)',
				},
				main: {
					DEFAULT: 'var(--color-main)',
					50: 'var(--color-main-50)',
					100: 'var(--color-main-100)',
					200: 'var(--color-main-200)',
					300: 'var(--color-main-300)',
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					50: 'var(--color-accent-50)',
					100: 'var(--color-accent-100)',
					200: 'var(--color-accent-200)',
					300: 'var(--color-accent-300)',
				},
				primary: {
					DEFAULT: 'var(--primary)',
					alt: 'var(--primary-alt)',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					alt: 'var(--secondary-alt)',
				},
				error: {
					DEFAULT: 'var(--color-negative)',
				},
			},
		},
	},
	plugins: [],
};
