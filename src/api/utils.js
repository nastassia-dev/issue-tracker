export const handleResponse = (res) => {
	if (res.ok) return res.json();
	if (res.status === 400) {
		const err = res.text();
		throw new Error(err);
	}
	throw new Error('Request failed');
};

export const handleError = (err) => {
	throw err;
};

export const sortAndSplitDashboards = (dashboards) => {
	const all = [...dashboards];
	all.sort((a, b) => (((a.updatedAt || a.createdAt) < (b.updatedAt || b.createdAt)) ? 1 : -1));
	const data = all.reduce((acc, d) => {
		acc[d.status].push(d);
		return acc;
	}, { active: [], archived: [] });
	return data;
};
