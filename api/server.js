const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
  // разрешения на чтение/запись
  users: 600,
  posts: 640,
  comments: 660
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Set up authorization rules
server.use(rules);
// Add this before server.use(router)
server.use(auth);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server with Auth is running');
});

