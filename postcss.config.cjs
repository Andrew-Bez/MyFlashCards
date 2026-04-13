module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue: 16, // 1rem = 16px
			propList: ['*'], // конвертувати всі властивості
			selectorBlackList: ['html', 'body'],
			replace: true,
			mediaQuery: true,
			minPixelValue: 2,
		},
	},
}
