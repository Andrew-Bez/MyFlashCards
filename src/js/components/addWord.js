export default function initForm(formSelector) {
	const forms = document.querySelectorAll(formSelector)

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: data,
		})
		return await res.json()
	}

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Word added ✅',
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

			const json = JSON.stringify(Object.fromEntries(formData.entries()))

			postData('http://localhost:3000/words', json)
				.then(data => {
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
