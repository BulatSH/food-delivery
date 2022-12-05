const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
}

const getResource = async (url) => {
	const res = await fetch(url);

	// Обработаем в ручную, 
	// Т.к. если внутри фетча промис попадает на ошибку, 
	// которая связана с нттп протоколом, он не выкинет реджект
	// У промиса, котрый возвращается из фетч есть два свойста
	// .ok - все просто, окей, или не окей)
	// .status - код ошибки, который вернул сервер
	if (!res.ok) {
		// Выкидываем новую ошибку
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return await res.json();
}

export { postData };
export { getResource };
