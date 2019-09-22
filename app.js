const Koa = require('koa'),
    helmet = require("koa-helmet"),
    compress = require('koa-compress'),
    app = new Koa()

app.use(compress())
app.use(helmet())
app.use(require('koa-static')("public"))
app.listen(3000)