# ENKE.DEV lint

## Install packages

Make sure to install the necessary peer dependencies `eslint` and `prettier`.

```bash
npm i -D @enke.dev/lint eslint prettier
```

## Prepare config

Create a `eslint.config.js` file in the root of your project and add the following content:

```js
import config from '@enke.dev/lint';

export default config;
```

## Using typescript

If you intend to use Typescript for your config file, you have to do some trickery right now:

```bash
# run eslint with a flag
eslint --flag unstable_ts_config -c eslint.config.ts
```

You may want to configure VSCodes eslint plugin to use the `unstable_ts_config` flag by default and to pick up the config file as well:

```json
{
  "eslint.options": {
    "flags": ["unstable_ts_config"],
    "overrideConfigFile": "./eslint.config.ts"
  }
}
```

## Using monorepos

Like the experimental typescript config flag above, the VSCode Eslint plugin can be configured to pick up the packages correctly by setting:

```json
{
  "eslint.workingDirectories": ["./packages/foo", "./packages/bar"]
}
```
