'use strict'

const Express = require('express')
const router = Express.Router()
const CommentsController = require('../controllers/comments')

router
  .delete('/:id', (req, res) => {
    CommentsController.markAsDeleted(req.params)
      .then((comment) => {
        res.json(comment)
      })
  })
  .patch('/:id', (req, res) => {
    CommentsController.update(Object.assign({}, req.params, req.body))
      .then((comment) => {
        res.json(comment)
      })
  })
  .post('/', (req, res) => {
    CommentsController.create(req.body)
      .then((comment) => {
        res.json(comment)
      })
  })
  .get('/', (req, res) => {
    CommentsController.list(req.query)
      .then((comments) => {
        res.json(comments)
      })
  })

module.exports = router