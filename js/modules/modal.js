// Каждый модуль должен быть независим друг от друга,
// это не значит, что нельзя вызывать в другом модуле кусочек другого модуля
// это значит, что они не должны привязываться к одним и тем же сущностям
// каждый модуль может быть вызван несколько раз для разных элементов

// Модули нужно созадвать так, чтобы они зависели от аргументов, которые в них передаются

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');

	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');

	document.body.style.overflow = ''; // '' по умолчанию
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalTriggers = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTriggers.forEach(btn => {
		// Здесь есть одна загвоздка, когда мы в обработчик события передаем колбэк функцию, 
		// мы не должны ее сразу вызывать, только объявляем
		// если мы просто передадим селктор openModal(modalSelector), то она вызовется сразу, как загрузится страница
		// Чтобы обойти это, используется можно создать стрелочную функцию () => openModal(modalSelector)
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});
	// https://www.toptal.com/developers/keycode/for/ - коды клавиш

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // -1 если не отрабатывает, в некоторых браузерах может не отрабатывает, это решает ошибку
			openModal(modalSelector, modalTimerId);

			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
	// {
	//     once: true // не сработает, т.к. scroll происходит каждый раз, когда немного пролистываем
	// }
}

export default modal;
export { closeModal };
export { openModal };
