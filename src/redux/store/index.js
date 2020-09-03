// Dynamic import at build-time
if (process.env.NODE_ENV === 'production') {
	// eslint-disable-next-line global-require
	module.exports = require('./store.prod');
} else {
	// eslint-disable-next-line global-require
	module.exports = require('./store.dev');
}
