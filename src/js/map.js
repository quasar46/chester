document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('#map')) {
		ymaps.ready(init);
	}

	function init() {
		var myMap = new ymaps.Map("map", {
			center: [55.741414, 37.579286],
			zoom: 12,
			controls: [],
		}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'Собственный значок метки',
				balloonContent: 'Честер'
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/boolian.webp',
				iconImageSize: [19, 29],
				iconImageOffset: [-5, -38]
			});
		myMap.geoObjects
			.add(myPlacemark)
	}
})
