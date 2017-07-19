'use strict'

const Model = require('objection').Model
const Posts = require('./posts')

class Comments extends Model {
  static get tableName() {
    return 'comments'
  }
}

module.exports = Comments