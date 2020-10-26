// API

const servers = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}];

module.exports = function setup(app) {
  app.get('/api/stats', (req, res) => {
    res.json({
      status: 'online',
      servers
    });
  });

  app.post('/api/servers', (req, res) => {
    if (!req.body.name) {
      return res.json({
        error: 'cannot add server with empty name'
      });
    }
    servers.push({
      id: servers[servers.length - 1].id + 1,
      name: req.body.name
    });
    res.json({
      success: true
    });
  });
};
