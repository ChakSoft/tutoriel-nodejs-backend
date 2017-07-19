'use strict'

const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

module.exports = safeLoad(readFileSync(`${__dirname}/config.yml`))
