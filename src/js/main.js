import '../sass/style.scss'

window.addEventListener('DOMContentLoaded', () => {
	// TABS
	const tabs = document.querySelectorAll('.sidebar__item'),
		tabsContent = document.querySelectorAll('.tab-content'),
    tabsParent = document.querySelector('.sidebar')
  
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none'
    })
    tabs.forEach(item => {
      item.classList.remove('sidebar__item-active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'grid'
    tabs[i].classList.add('sidebar__item-active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (e) => {
    e.preventDefault()
    const target = e.target.closest('.sidebar__item')

    if (target && target.classList.contains('sidebar__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })
})
