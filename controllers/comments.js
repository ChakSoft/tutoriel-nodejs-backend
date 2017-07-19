'use strict'

const { Comments } = require('../models')

module.exports = {
  create({ postId, content, createdBy }) {
    return Comments
      .query()
      .insert({
          post_id : postId,
          content,
          created_by : createdBy
      })
  },
  update({ id, content }) {
    return Comments
      .query()
      .patchAndFetchById(id, { content })
  },
  markAsDeleted({ id }) {
    return Comments
      .query()
      .patchAndFetchById(id, { deleted : 1 })
  },
  list({ postId }) {
    return Comments
      .query()
      .where({ post_id: postId })
  }
}