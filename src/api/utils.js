export const handleResponse = res => {
	if (res.ok) return res.json();
	if (res.status === 400) {
		const err = res.text();
		throw new Error(err);
	}
	throw new Error('Request failed')
};

export const handleError = err => {
	throw err;
};
