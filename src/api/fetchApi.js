import { handleError, handleResponse } from './utils';

export const reqType = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};
const headers = { 'content-type': 'application/json' };

const GET = url => fetch(url)
	.then(handleResponse)
	.catch(handleError);

const PUT = (url, body) => fetch(url, {
	method: reqType.PUT,
	headers,
	body: JSON.stringify(body)
})
	.then(handleResponse)
	.catch(handleError);

const POST = (url, body) => fetch(url, {
	method: reqType.POST,
	headers,
	body: JSON.stringify(body)
})
	.then(handleResponse)
	.catch(handleError);

const DELETE = url => fetch(url, { method: reqType.DELETE })
	.then(handleResponse)
	.catch(handleError);

export default {
	GET,
	PUT,
	POST,
	DELETE
}
