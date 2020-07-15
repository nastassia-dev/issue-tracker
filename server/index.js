const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now();
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
server.get('/echo', (req, res) => {
	res.jsonp(req.query)
});

server.use(router);
server.listen(3111, () => {
	console.log('JSON Server is running')
});

