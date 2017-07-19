'use strict'

const { Posts } = require('../models')

module.exports = {
  list() {
    return Posts
      .query()
      .eager('comments')
	    .modifyEager('comments', (builder) => {
        builder.where({ deleted : 0 })
      })
      .where({ deleted : 0 })
  },
  create({ title, content, comments = [] }) {
    return Posts
      .query()
      .insertGraph({ title, content, comments })
  },
  getOne(id) {
    return Posts
      .query()
      .where({ id })
      .then((posts) => (posts.length ? posts[0] : null))
  },
  update({ id, title, content }) {
    return Posts
      .query()
      .patchAndFetchById(id, { title, content })
  },
  markAsDeleted({ id }) {
    return Posts
      .query()
      .patchAndFetchById(id, { deleted : 1 })
  }
}