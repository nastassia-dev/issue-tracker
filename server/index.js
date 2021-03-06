// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');
const path = require('path');
const crypto = require('crypto');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

function slugify (value) {
	return value
		.toLowerCase()
		.replace(/\s+/g, '-') // replaces any spaces with - (hyphen)
		// eslint-disable-next-line no-useless-escape
		.replace(/[^\w\-]+/g, '') // removes any non-word, non-hyphen characters
		// eslint-disable-next-line no-useless-escape
		.replace(/\-\-+/g, '-') // converts multiple hyphens to a single one
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}
function getTimeStamp () {
	return new Date().toISOString().slice(0, 10);
}
// Simulate delay to test loading states
server.use((req, res, next) => {
	setTimeout(next, 20);
});
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = getTimeStamp();
	}
	if (req.method === 'PUT') {
		req.body.updatedAt = getTimeStamp();
	}
	// Continue to JSON Server router
	next();
});

server.post('/dashboards', (req, res, next) => {
	req.body.status = 'active';
	req.body.columnOrder = [];
	req.body.slug = slugify(req.body.title);
	next();
});
server.post('/dashboards/:id/columns', (req, res, next) => {
	req.body.taskIds = [];
	next();
});
server.get('/dashboards', (req, res, next) => {
	const { slug } = req.query;
	const { db } = router;
	if (slug) {
		const dashboardsCollection = db.get('dashboards');
		const dashboard = dashboardsCollection.find({ slug }).value();
		if (!dashboard) {
			next();
		} else {
			const columnsCollection = db.get('columns');
			const tasksCollection = db.get('tasks');
			const columns = dashboard.columnOrder.map(id => columnsCollection.find({ id }).value());
			const taskIds = columns.reduce((a, c) => ([...a, ...c.taskIds]), []);
			const tasks = taskIds.map(id => tasksCollection.find({ id }).value());
			const data = [{
				...dashboard,
				columns,
				tasks,
			}];
			res.status(200);
			res.send(data);
		}
	} else {
		next();
	}
});
const defaultColumnNames = ['ToDo', 'InProgress', 'Done'];
const defaultTask = { content: 'Add more tasks' };
const generateUuid = () => crypto.randomBytes(16).toString('hex');
server.post('/dashboards/columns', (req, res) => {
	const dashboardId = generateUuid();
	const taskId = generateUuid();
	const createdAt = getTimeStamp();
	const { db } = router;
	const dashboardsCollection = db.get('dashboards');
	const columnsCollection = db.get('columns');
	const tasksCollection = db.get('tasks');
	const columnOrder = [];
	const columns = [];
	const task = { ...defaultTask, id: taskId };
	tasksCollection.push(task).write();
	defaultColumnNames.forEach((title, i) => {
		const taskIds = i === 0 ? [taskId] : [];
		const columnId = generateUuid();
		const column = {
			id: columnId,
			title,
			taskIds,
			dashboardId,
			createdAt,
		};
		columnOrder.push(columnId);
		columns.push(column);
		columnsCollection.push(column).write();
	});
	const dashboard = {
		id: dashboardId,
		title: req.body.title,
		description: req.body.description,
		createdAt,
		status: 'active',
		columnOrder,
		slug: slugify(req.body.title)
	};
	dashboardsCollection.push(dashboard).write();

	res.status(201);
	res.send({ ...dashboard, columns, tasks: [task] });
});

server.post('/columns', (req, res) => {
	const { dashboardId } = req.body;
	const { db } = router;
	const dashboardsCollection = db.get('dashboards');
	const columnsCollection = db.get('columns');
	const createdAt = getTimeStamp();
	const columnId = generateUuid();
	const column = {
		id: columnId,
		title: req.body.title,
		taskIds: [],
		dashboardId,
		createdAt,
	};
	columnsCollection.push(column).write();
	const dashboard = dashboardsCollection.find({ id: dashboardId }).value();
	const columnOrder = [...dashboard.columnOrder, columnId];
	dashboardsCollection.find({ id: dashboardId })
		.assign({ columnOrder }).write();

	res.status(201);
	res.send({ dashboard, column });
});

server.use(router);
server.listen(3111, () => {
	console.log('JSON Server is running');
});
