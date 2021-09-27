'use strict';
exports.__esModule = true;
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var schemas = glob.sync(path.join(__dirname, './schemas/*.prisma'));
var schema =
  'datasource db {\n    provider = "postgresql"\n    url      = env("DATABASE_URL")\n}\n\ngenerator client {\n    provider = "prisma-client-js"\n    previewFeatures = ["filterJson"]\n}\n';
schema += schemas.reduce(function (
  currentSchema: any,
  filename: any,
) {
  var partialSchama = fs.readFileSync(filename).toString();
  var cleanSchema = partialSchama.split(
    '// GENERATE-PRISMA-SCHEMA-DELETE //',
  )[0];

  return currentSchema + '\n' + cleanSchema;
},
'');
fs.writeFileSync(path.join(__dirname, './schema.prisma'), schema);
