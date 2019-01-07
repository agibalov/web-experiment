var koa = require('koa');
var koaStatic = require('koa-static');
var koaBodyParser = require('koa-body-parser');
var koaRouter = require('koa-router');
var path = require('path');

var app = koa();
app.use(koaStatic(path.resolve(__dirname)));
app.use(koaBodyParser());
app.use(koaRouter(app));
app.post('/add/', function* (next) {
  var body = this.request.body;
  var a = parseInt(body.a, 10);
  var b = parseInt(body.b, 10);
  var result = a + b;
  this.status = 200;
  this.body = {
    a: a,
    b: b,
    result: result
  };
});

app.listen(1337);
