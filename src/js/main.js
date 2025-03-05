// custome code
document.addEventListener('DOMContentLoaded', function () {
	const heightHeader = document.querySelector('header').clientHeight
	const els = document.querySelectorAll('.submenu ul ul')
	if (window.innerWidth > 1210) {
		els.forEach(el => {
			console.log(el)
			let posEl = el.getBoundingClientRect()
			el.style.marginTop = `calc(-${posEl.top}px + ${heightHeader}px)`;
			console.log(el)
		})
	} else {
		const menuLinks = document.querySelectorAll('.menu__has-child')
		menuLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				link.classList.add('active')
				e.preventDefault()
				link.querySelector('.submenu').classList.add('show')
			})
		})
	}
	const menuBtn = document.querySelector('.burger')
	const menu = document.querySelector('.menu')
	const body = document.querySelector('body')
	menuBtn.addEventListener('click', function () {
		this.classList.toggle('active');
		menu.classList.toggle('active')
		body.classList.toggle('hidden')
	})

	if (window.innerWidth < 1210) {
		const newLi = document.createElement('span')
		menu.append(newLi)
		newLi.append(document.querySelector('.header__phone'))
		menu.style.height = `calc(100vh - ${heightHeader}px)`
	}

	const swiper1 = new Swiper('.staff__swiper', {
		slidesPerView: 3,
		spaceBetween: 22,
		autoHeight: "true",
		navigation: {
			nextEl: '.staff__swiper .swiper-button-next',
			prevEl: '.staff__swiper .swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 22,
			}
		},
		pagination: {
			el: ".staff__swiper .swiper-pagination"
		}
	})

	const swiper2 = new Swiper('.case__swiper-1', {
		slidesPerView: 1,
		autoHeight: "true",
		navigation: {
			nextEl: '.case__swiper-1 .swiper-button-next',
			prevEl: '.case__swiper-1 .swiper-button-prev',
		},
		pagination: {
			el: ".case__swiper-1 .swiper-pagination",
			clickable: "true",
			dynamicBullets: true,
		}
	})

	const swiper3 = new Swiper('.case__swiper-2', {
		slidesPerView: 1,
		autoHeight: "true",
		navigation: {
			nextEl: '.case__swiper-2 .swiper-button-next',
			prevEl: '.case__swiper-2 .swiper-button-prev',
		},
		pagination: {
			el: ".case__swiper-2 .swiper-pagination",
			clickable: "true",
			dynamicBullets: true,
		}
	})

	const swiper4 = new Swiper('.case__swiper-3', {
		slidesPerView: 1,
		autoHeight: "true",
		navigation: {
			nextEl: '.case__swiper-3 .swiper-button-next',
			prevEl: '.case__swiper-3 .swiper-button-prev',
		},
		pagination: {
			el: ".case__swiper-3 .swiper-pagination",
			clickable: "true",
			dynamicBullets: true,
		}
	})

	const swiper5 = new Swiper('.case__swiper-4', {
		slidesPerView: 1,
		autoHeight: "true",
		navigation: {
			nextEl: '.case__swiper-4 .swiper-button-next',
			prevEl: '.case__swiper-4 .swiper-button-prev',
		},
		pagination: {
			el: ".case__swiper-4 .swiper-pagination",
			clickable: "true",
			dynamicBullets: true,
		}
	})

	const swiper6 = new Swiper('.case__swiper-5', {
		slidesPerView: 1,
		autoHeight: "true",
		navigation: {
			nextEl: '.case__swiper-5 .swiper-button-next',
			prevEl: '.case__swiper-5 .swiper-button-prev',
		},
		pagination: {
			el: ".case__swiper-5 .swiper-pagination",
			clickable: "true",
			dynamicBullets: true,
		}
	})

	const swiper7 = new Swiper('#swiper-lawyers', {
		slidesPerView: 1,
		navigation: {
			nextEl: '#swiper-lawyers .swiper-button-next',
			prevEl: '#swiper-lawyers .swiper-button-prev',
		},
		pagination: {
			el: '#swiper-lawyers .swiper-pagination'
		}
	})

	const swiper8 = new Swiper('#swiper-lawyers-mobile', {
		slidesPerView: 1,
		autoHeight: true,
		navigation: {
			nextEl: '#swiper-lawyers-mobile .swiper-button-next',
			prevEl: '#swiper-lawyers-mobile .swiper-button-prev',
		},
		// pagination: {
		// 	el: '#swiper-lawyers-mobile .swiper-pagination'
		// }
	})



	const scrollTop = document.querySelector('.scroll-top')
	scrollTop.addEventListener('click', ev => {
		window.scrollTo(0, 0)
	})
	let showHideButton = function () {
		window.scrollY > 300
			? scrollTop.classList.add('vis')
			: scrollTop.classList.remove('vis')
	}

	window.addEventListener('scroll', showHideButton)
	showHideButton()

	if (document.querySelector('.tab-container')) {
		var tabs1 = document.querySelector('.tab-container')
		tabs(tabs1);
	}

	if (document.querySelector('.tab-container2')) {
		var tabs2 = document.querySelector('.tab-container2')
		tabs(tabs2);
	}

	if (document.querySelector('.tab-container3')) {
		var tabs3 = document.querySelector('.tab-container3')
		tabs(tabs3);
	}


	// const body = document.querySelector('body')
	const modal = document.querySelector('.modal')
	const overlay = document.querySelector('.overlay')
	const btnCloseModal = document.querySelector('.modal__close');
	const btnsShowmodal = document.querySelectorAll('.show-modal')

	function showModal() {
		modal.classList.add('active')
		overlay.classList.add('active')
		// body.style.overflow = "hidden"
	}

	function closeModal() {
		modal.classList.remove('active')
		overlay.classList.remove('active')
		// body.style.overflow = "";
	}

	btnsShowmodal.forEach(btn => {
		btn.addEventListener('click', function (e) {
			e.preventDefault()
			showModal()
		})
	})

	btnCloseModal.addEventListener('click', function () {
		closeModal()
	})

	document.addEventListener('click', function (e) {
		const target = e.target
		if (target.classList.contains('overlay')) {
			closeModal()
		}
	})

	// animate main bg
	const bg = document.querySelector("#bg");
	if (document.querySelector("#bg")) {
		window.addEventListener("scroll", () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

			const maxScroll = scrollHeight - clientHeight;

			const power = 5;
			const scale = 1 + (scrollTop / maxScroll) * power;

			bg.style.transform = `scale(${scale})`;
		});
	}

	AOS.init();

	// valid form
	// const inputs = document.querySelectorAll('form input')
	// inputs.forEach(input=> {
	// 	input.classList.add('error')
	// 	input.addEventListener('input', function() {
	// 		input.classList.remove('error')
	// 	})
	// })
})

if (document.querySelector('.work-directions__img')) {
	document.querySelector('.work-directions__img').style = `height: ${document.querySelector('.work-directions__links').clientHeight}px`
}



$(function () {
	let header = $('.header');
	let hederHeight = header.height(); // вычисляем высоту шапки

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1) {
			header.addClass('header--fixed');
			$('body').css({
				'paddingTop': hederHeight + 'px' // делаем отступ у body, равный высоте шапки
			});
		} else {
			header.removeClass('header--fixed');
			$('body').css({
				'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
			})
		}
	});
});

$(document).ready(function () {
	// вешаем маску на телефон
	$('.phone-field').inputmask("+7(999)999-9999");

	// добавляем правило для валидации телефона
	jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
		return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value);
	});
})

$(document).ready(function () {
	$('form').submit(function (e) {
		e.preventDefault();
		let name = $(this).find('[name="name"]').val();
		let tel = $(this).find('[name="tel"]').val();
		$.ajax({
			url: "https://chesterk.ru/sendmail.php", // куда отправляем
			type: "post", // метод передачи
			data: { // что отправляем
				"name": name,
				"tel": tel,
			},
			error: function () {
				console.log('форма не отправлена');
			},
			success: function (result) { /* В случае удачной обработки и отправки выполнится следующий код*/
				window.location = "thanks.html";
			}
		})
	})

	if ($('#acc')) {
		$("#acc").accordionjs();
	}

	if ($('#acc2')) {
		$("#acc2").accordionjs();
	}

})
