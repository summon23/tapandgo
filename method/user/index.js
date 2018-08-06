'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const ResponseHandler = require('../../utils/response_handler');
const routes = require('../../utils/routes');
module.exports = routes.genRoute(__dirname);
