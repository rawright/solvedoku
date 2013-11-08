// server.js
var http = require('http'),
  url = require('url'),
  ipaddress = "127.0.0.1",
  port = 8081;
function start(route, handle) {
  function onRequest(req, res) {
    var postData = '',
      pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    req.addListener('data, function (postDataChunk) {
      postData += postDataChunk;
    });
    req.addListener('end', function () {
      route(handle, pathname, res, postData);
    });
  }
  http.createServer(onRequest).listen(port, ipaddress, function () {
    console.log('%s: Node server started on %s:%d ...',
      Date(Date.now()), ipaddress, port);
  });
}
