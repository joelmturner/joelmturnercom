"use strict"

require("source-map-support").install()
require("ts-node").register()

exports.createSchemaCustomization = require("./scripts/createSchemaCustomization").default
exports.createPages = require("./scripts/createPages").default
exports.onCreateNode = require("./scripts/onCreateNode").default
