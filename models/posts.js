'use strict'

const Model = require('objection').Model
const Comments = require('./comments')

class Posts extends Model {
  static get tableName() {
    return 'posts'
  }
  static get relationMappings() {
    return {
      comments : {
        relation : Model.HasManyRelation,
        modelClass : Comments,
        join : {
          from : 'posts.id',
          to : 'comments.post_id'
        }
      }
    }
  }
}

module.exports = Posts