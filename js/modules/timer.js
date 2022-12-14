function timer(id, deadline) {
	function getTimeRemaining(endtime) { // Получение разницы между датами: текущей и deadline
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date()); // Разницп между датами в количестве миллисекунд

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)), // Делим на количество миллисекунд в одном дне
				hours = Math.floor((t / (1000 * 60 * 60)) % 24), // Остаток часов от деления на один день
				minutes = Math.floor((t / (1000 * 60)) % 60), // Остаток минут от деления на один час
				seconds = Math.floor((t / 1000) % 60); // Остаток секунд от деления на одну секунду
		}

		return {
			'total': t, // Вдруг таймер закончился? - понадобится
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(id, deadline);
}

export default timer;
