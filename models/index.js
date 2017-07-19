'use strict'

const { database } = require('../config')
const Objection = require('objection')
const Knex = require('knex')
const Model  = Objection.Model

const connection = Knex({
	client : 'mysql',
	connection : {
		host : database.host,
		port : database.port,
		user : database.user,
		password : database.pass,
		database : database.name
	},
	debug : true
})
Model.knex(connection)

module.exports = {
	Posts : require('./posts'),
    Comments : require('./comments')
}
