// custome code
document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.querySelector('.burger')
	const menu = document.querySelector('.menu')
	menuBtn.addEventListener('click', function () {
		this.classList.toggle('active');
		menu.classList.toggle('active')
	})

	const swiper1 = new Swiper('.staff__swiper', {
		slidesPerView: 3,
		spaceBetween: 22,
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
		}
	})

	const swiper2 = new Swiper('.case__swiper-1', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.case__swiper-1 .swiper-button-next',
			prevEl: '.case__swiper-1 .swiper-button-prev',
		}
	})

	const swiper3 = new Swiper('.case__swiper-2', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.case__swiper-2 .swiper-button-next',
			prevEl: '.case__swiper-2 .swiper-button-prev',
		}
	})

	const swiper4 = new Swiper('.case__swiper-3', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.case__swiper-3 .swiper-button-next',
			prevEl: '.case__swiper-3 .swiper-button-prev',
		}
	})

	const swiper5 = new Swiper('.case__swiper-4', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.case__swiper-4 .swiper-button-next',
			prevEl: '.case__swiper-4 .swiper-button-prev',
		}
	})

	const menuItems = document.querySelectorAll('.menu__item');
	menuItems.forEach(item=> {
		item.addEventListener('click', function() {
			this.querySelector('.dropdown').classList.toggle('active');
			this.querySelector('svg').classList.toggle('active');
		})
	})

	const scrollTop = document.querySelector('.scroll-top')
	scrollTop.addEventListener('click', ev => {
		window.scrollTo(0, 0)
	})
	let showHideButton = function () {
		window.scrollY > 300
			? scrollTop.classList.add('--vis')
			: scrollTop.classList.remove('--vis')
	}

	window.addEventListener('scroll', showHideButton)
	showHideButton()

	var tabs1 = document.querySelector('.tab-container')
	tabs(tabs1);
	var tabs2 = document.querySelector('.tab-container2')
	tabs(tabs2);


	const overlay = document.querySelector('.overlay')
	const closePopup = document.querySelector('.popup__close');
	const showPopup = document.querySelectorAll('.show-popup')

	showPopup.forEach(btn => {
		btn.addEventListener('click', function () {
			overlay.classList.add('active')
		})
	})


	closePopup.addEventListener('click', function () {
		this.closest('.overlay').classList.remove('active');
	})

	if (document.querySelector('.accordion-container')) {
		new Accordion('.accordion-container');
	}

})

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