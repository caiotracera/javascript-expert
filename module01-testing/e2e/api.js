const http = require("http");

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },

  default: (request, response) => {
    response.write("Hello world!");
    return response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosenRoute = routes[routeKey] || routes.default;
  response.writeHead(200, { "Content-Type": "text/html" });

  return chosenRoute(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at port", 3000));

module.exports = app;
