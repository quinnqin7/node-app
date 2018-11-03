'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const path = require('../src/api/path')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://'+path.host.ip+':'+path.host.vueport+'"',
})
