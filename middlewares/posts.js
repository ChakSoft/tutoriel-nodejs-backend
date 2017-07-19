'use strict'

const Express = require('express')
const Cors = require('cors')
const router = Express.Router()
const PostsController = require('../controllers/posts')

let cors = Cors()
if (process.env.NODE_ENV === 'production') {
  cors = Cors({
    origin : '*',
    methods : [ 'GET' ],
    optionsSuccessStatus : 200,
    exposedHeaders : [ 'X-Origin-Token' ],
  })
}

router
  .delete('/:id', (req, res) => {
    PostsController.markAsDeleted(req.params)
      .then((post) => {
        res.json(post)
      })
  })
  .patch('/:id', (req, res) => {
    PostsController.update(Object.assign({}, req.params, req.body))
      .then((post) => {
        res.json(post)
      })
  })
  .post('/', (req, res) => {
    PostsController.create(req.body)
      .then((post) => {
        res.json(post)
      })
  })
  .get('/', cors, (req, res) => {
    PostsController.list()
      .then((posts) => {
        res.json(posts)
      })
  })
  .get('/:id', cors, (req, res) => {
    PostsController.getOne(req.params.id)
      .then((post) => {
        if (post === null) {
          return res.status(404).json({ error : 'Not Found' })
        }
        return res.json(post)
      })
  })

module.exports = router