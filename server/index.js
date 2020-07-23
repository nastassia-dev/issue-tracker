const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/\s+/g, "-") // replaces any spaces with - (hyphen)
		.replace(/[^\w\-]+/g, "") // removes any non-word, non-hyphen characters
		.replace(/\-\-+/g, "-") // converts multiple hyphens to a single one
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}
function getTimeStamp() {
	return new Date().toISOString().slice(0, 10);
}
// Simulate delay to test loading states
server.use(function(req, res, next) {
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

server.use(router);
server.listen(3111, () => {
	console.log('JSON Server is running')
});

