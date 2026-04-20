import { postData } from '../services/services'
import initWordsList from './wordsList'

export default function initForm(formSelector) {
	const forms = document.querySelectorAll(formSelector)

	const message = {
		loading: '../../../public/img/spinner.svg',
		success: 'Add new word =)',
		failure: 'Failed =(',
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
					showThanksModal(message.success)
					statusMessage.remove()
				})
				.catch(() => {
					showThanksModal(message.failure)
				})
				.finally(() => {
					form.reset()
				})
		})
	}
}
