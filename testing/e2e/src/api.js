const http = require('node:http');
const { once } = require('node:events');

const DEFAULT_USER = { username: 'lorem', password: 'ipsum' };

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  '/login:post': async (request, response) => {
    //  curl -X POST --data '{"username": "loreM","password": "ipsum"}' localhost:3000/login
    const user = JSON.parse(await once(request, 'data'));

    const { username, password } = user;

    if (
      username.toLowerCase() !== DEFAULT_USER.username.toLowerCase() ||
      password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.write('unauthorized');
      return response.end();
    }

    return response.end('ok');
  },
  default: (request, response) => {
    response.writeHead(404);
    return response.end('not found!');
  },
};

function handler(request, response) {
  const { url, method } = request;

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const routeChosen = routes[routeKey] || routes.default;

  return routeChosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;
