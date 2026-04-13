// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
	base: './',

	root: 'src/',

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@js': path.resolve(__dirname, './src/js'),
			'@sass': path.resolve(__dirname, './src/sass'),
			'@img': path.resolve(__dirname, './src/img'),
		},
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @use '@/sass/base/variables' as *;
          @use '@/sass/base/mixins' as *;
        `,
			},
		},
		// Налаштування PostCSS для px → rem
		postcss: {
			plugins: [
				(await import('postcss-pxtorem')).default({
					rootValue: 16,
					propList: ['*'],
					selectorBlackList: ['html', 'body'],
					replace: true,
					mediaQuery: true,
					minPixelValue: 1,
				}),
			],
		},
	},

	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, './src/index.html'),
			},
			output: {
				assetFileNames: assetInfo => {
					if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
						return 'assets/img/[name]-[hash][extname]'
					}
					return 'assets/[name]-[hash][extname]'
				},
			},
		},
	},

	server: {
		port: 5173,
		open: true,
	},
})
