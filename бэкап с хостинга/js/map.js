var myMap;

if (document.querySelector('#map')) {

	// Дождёмся загрузки API и готовности DOM.
	ymaps.ready(init);
	function init() {
		// Создание экземпляра карты и его привязка к контейнеру с
		// заданным id ("map").
		myMap = new ymaps.Map('map', {
			// При инициализации карты обязательно нужно указать
			// её центр и коэффициент масштабирования.
			center: [55.741541, 37.578975], // Москва
			zoom: 12,
			controls: [],
		});

		myPlacemark1 = new ymaps.Placemark([55.741541, 37.578975], {
			// Свойства.
			hintContent: 'Честер'
		}, {
			// Опции.
			// Своё изображение иконки метки.
			// iconImageHref: '../../images/logo.png',
			// Размеры метки.
			// iconImageSize: [40, 46],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			// iconImageOffset: [-3, -42]
		});

		// Добавляем все метки на карту.
		myMap.geoObjects
			.add(myPlacemark1)
	}
}