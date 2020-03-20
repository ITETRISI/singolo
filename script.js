class NavigationBar {

	static activeElement(event, array) {
		array.forEach(element => element.classList.remove('active'))
		event.classList.add('active')
	}

	static switchTab() {
		let lastImage = document.querySelector('.portfolio__collection img:last-child')
		document.querySelector('.portfolio__collection img').insertAdjacentElement('beforebegin', lastImage)
	}

	static onScroll() {
		let currentPosition = window.scrollY
		let anchors = document.querySelectorAll('.wrapper > a');
		let links = document.querySelectorAll('.header__list_item a')
		anchors.forEach( element => {
			let section = document.querySelector(`.${element.id}`)
			if(element.offsetTop-2 < currentPosition && (element.offsetTop + section.offsetHeight) > currentPosition){
				links.forEach((a) => {
					if(element.id === a.getAttribute('href').slice(1)){
						NavigationBar.activeElement(a, links)
					}
				})
			}
		})
	}
}

document.querySelectorAll('.portfolio__collection img').forEach((element, i, array) => element.addEventListener('click', () => NavigationBar.activeElement(event.target, array)))

document.querySelectorAll('.portfolio__switcher-item').forEach((element, i, array) => element.addEventListener('click', () => {
	NavigationBar.activeElement(event.target, array)
	NavigationBar.switchTab()
}))

document.addEventListener('scroll' ,NavigationBar.onScroll)



class Form {

	static displayInfo() {
		let block = document.querySelector('.forms__info').classList;
		if (block.contains('active')) {
			block.remove('active')
			document.querySelectorAll("#text,#email,#theme,#description").forEach(element => element.value = '')
		} else {
			block.add('active')
		}
	}

	static getData() {
		let theme = document.querySelector('#theme').value;
		let description = document.querySelector('#description').value;
		document.querySelector('.forms__info-theme').innerHTML = theme ? `Тема: ${theme}` : "Без темы";
		document.querySelector('.forms__info-description').innerHTML = description ? `Описание: ${description}` : "Без описания";
	}
}

document.querySelector(".quote__forms-inputs").addEventListener("submit", () => {
	event.preventDefault()
	Form.getData()
	Form.displayInfo()
})

document.querySelector('.forms__info-btn').addEventListener('click', Form.displayInfo)

class Slider {

	static slideIndex = 0;

	static changeSlide(position) {
		this.slideIndex += position;
		let slides = document.querySelector(".slider__slides")
		if (this.slideIndex > slides.childElementCount - 1) {
			this.slideIndex = 0;
		} else if (this.slideIndex < 0) {
			this.slideIndex = slides.childElementCount - 1;
		}
		slides.style.transform = `translateX(${this.slideIndex*-slides.clientWidth}px)`
	}

	static hideDisplay() {
		let display = this.firstElementChild
		display.classList.contains('active') ? display.classList.remove('active') : display.classList.add('active');
	}
}

document.querySelector('.arrow-left').addEventListener('click', () => {
	const scrollLeft = -1;
	Slider.changeSlide(scrollLeft);
})

document.querySelector('.arrow-right').addEventListener('click', () => {
	const scrollRight = 1
	Slider.changeSlide(scrollRight)
})

document.querySelectorAll('.phone').forEach(element => {
	element.addEventListener('click', Slider.hideDisplay)
})
