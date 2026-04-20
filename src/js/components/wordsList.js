class WordsList {
	constructor({ id, word, translate, status }) {
		this.id = id
		this.word = word
		this.translate = translate
		this.status = status
	}

	render() {
		const elem = document.createElement('li')
		elem.classList.add('words__item')
		elem.innerHTML = `${this.word} / ${this.translate} --<span class="words__item-status"> ${this.status}</span>`

		return elem
	}
}

async function initWordsList(parentSelector) {
	const parent = document.querySelector(parentSelector)

	if (!parent) return

	parent.innerHTML = ''

	try {
		const response = await fetch('http://localhost:3000/words')
		const data = await response.json()

		data.forEach(word => {
			const card = new WordsList(word)
			parent.appendChild(card.render())
		})
	} catch (error) {
		console.error('Помилка завантаження слів:', error)
	}
}

export default initWordsList
