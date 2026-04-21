import { postData } from '../services/services'
import initWordsList from './wordsList'

export default function initForm(formSelector) {
	const forms = document.querySelectorAll(formSelector)

	const message = {
		loading: '/img/spinner.svg',
		success: 'Success!!!',
		failure: 'Failed...',
	}

	forms.forEach(item => {
		bindPostData(item)
	})

	function bindPostData(form) {
		form.addEventListener('submit', e => {
			e.preventDefault()

			const statusMessage = document.createElement('img')
			statusMessage.src = message.loading
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`

			form.insertAdjacentElement('afterend', statusMessage)

			const formData = new FormData(form)

			const obj = Object.fromEntries(formData.entries())

			obj.status = 'new'
			obj.repetitions = 0

			const json = JSON.stringify(obj)

			postData('http://localhost:3000/words', json)
				.then(data => {
					initWordsList('.words__list')
					console.log(data)
					statusMessage.remove()
					showMessage(message.success)
				})
				.catch(error => {
					showMessage(message.failure)
				})
				.finally(() => {
					form.reset()
				})
		})
	}

	function showMessage(message) {
		const blockShowMessage = document.querySelector('.addWord__message')

		blockShowMessage.style.display = 'flex'

		blockShowMessage.innerHTML = `${message}`

		setTimeout(() => {
			blockShowMessage.style.display = 'none'
		}, 3000)
	}
}
