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
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now();
	}
	if (req.method === 'PUT') {
		req.body.updatedAt = Date.now();
	}
	// Continue to JSON Server router
	next();
});

/*
server.use((req, res, next) => {
	if (isAuthorized(req)) {
		next() // continue to JSON Server router
	} else {
		res.sendStatus(401)
	}
}) */
server.post('/dashboards', (req, res, next) => {
	req.body.status = 'active';
	req.body.slug = slugify(req.body.title);
	next();
});

server.use(router);
server.listen(3111, () => {
	console.log('JSON Server is running')
});

