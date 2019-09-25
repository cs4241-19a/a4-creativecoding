const Koa = require('koa')
const helmet = require('koa-helmet')
const compress = require('koa-compress')
const app = new Koa()

app.use(compress())
app.use(helmet())
app.use(require('koa-static')('public'))
app.listen(3000)
