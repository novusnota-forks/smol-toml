import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { equal, notEqual, ok } from 'node:assert'

const require = createRequire(import.meta.url)

// -- Test integrity
const SMOL_PATH = fileURLToPath(new URL('../../dist', import.meta.url))

const resolvedEsm = import.meta.resolve('smol-toml').slice('file://'.length)
const resolvedCjs = require.resolve('smol-toml')

notEqual(resolvedEsm, resolvedCjs)
ok(resolvedEsm.startsWith(SMOL_PATH), 'ESM not imported from repository')
ok(resolvedCjs.startsWith(SMOL_PATH), 'CJS not imported from repository')

// -- ESM

import TOML_esm from 'smol-toml'
import { parse as parse_esm, stringify as stringify_esm } from 'smol-toml'

equal(TOML_esm.parse, parse_esm)
equal(TOML_esm.stringify, stringify_esm)

// -- CJS

const TOML_cjs = require('smol-toml')
const { parse: parse_cjs, stringify: stringify_cjs } = require('smol-toml')

equal(TOML_cjs.parse, parse_cjs)
equal(TOML_cjs.stringify, stringify_cjs)
