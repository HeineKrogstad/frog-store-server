const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const fs = require('fs');
const path = require('path');
const filePath = path.join('db.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
  users: 600,
  posts: 640,
  comments: 660
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server with Auth is running');
});

module.exports = server;

