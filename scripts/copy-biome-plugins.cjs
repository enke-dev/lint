const { cp } = require('node:fs/promises');
const { resolve } = require('node:path');
const { env } = require('node:process');

const root = env.npm_config_local_prefix;
const pluginSource = resolve(__dirname, '../plugins');
const pluginRoot = resolve(root, 'node_modules', '.biome-plugins');

cp(pluginSource, pluginRoot, { recursive: true });
