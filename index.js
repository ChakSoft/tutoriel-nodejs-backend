'use strict'

const Express = require('express')
const BodyParser = require('body-parser')
const Compression = require('compression')
const app = Express()
const { api } = require('./config')

app
	.use(BodyParser.json())
	.use(Compression())
	.use('/posts', require('./middlewares/posts'))
	.use('/comments', require('./middlewares/comments'))
	.listen(api.port, () => {
		console.log(`Listening on port ${api.port}`)
	})
