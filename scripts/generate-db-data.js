const faker = require('faker');

const dbData = {
	tasks: [],
	dashboards: [],
	columns: [],
};

for (let i = 1; i <= 10; i++) {
	const dashboardId = faker.random.uuid();
	const columnOrder = [];
	['ToDo', 'In Progress', 'Done'].forEach(title => {
		const columnId = faker.random.uuid();
		columnOrder.push(columnId);
		dbData.columns.push({
			id: columnId,
			title,
			dashboardId,
			taskIds: [],
			createdAt: faker.date.recent().toISOString().slice(0, 10),
		});
	});
	const dashboard = {
		id: dashboardId,
		title: faker.lorem.words(),
		status: i%2 ? 'active': 'archived',
		slug: faker.lorem.slug(),
		description: faker.lorem.sentence(),
		columnOrder,
		createdAt: faker.date.recent().toISOString().slice(0, 10),
	};
	dbData.dashboards.push(dashboard);
}

dbData.columns.forEach(c => {
	const tasksNumber = faker.random.number(10);
	const taskIds = [];
	for (let i = 1; i <= tasksNumber; i++) {
		const taskId = faker.random.uuid();
		taskIds.push(taskId);
		dbData.tasks.push({
			id: taskId,
			content: faker.lorem.sentence(),
			columnId: c.id,
		});
	}
	c.taskIds = taskIds;
});

console.log(JSON.stringify(dbData));
