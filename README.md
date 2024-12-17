# ENKE.DEV lint

## Install packages

Make sure to install the necessary peer dependencies `eslint`, `prettier` and `typescript-eslint`.

```bash
npm i -D @enke.dev/lint eslint prettier typescript-eslint
```

## Prepare config

Create a `eslint.config.js` file in the root of your project and add the following content:

```js
import eslintTs from 'typescript-eslint';
import config from '@enke.dev/lint';

export default eslintTs.config(...config);
```

## Using typescript

If you intend to use Typescript for your config file, you have to do some trickery right now:

```bash
# install "jiti" once, to prevent an error
npm i -D jiti

# run eslint with a flag
eslint --flag unstable_ts_config -c eslint.config.ts
```

You may want to configure VSCodes eslint plugin to use the `unstable_ts_config` flag by default:

```json
{
  "eslint.options": {
    "unstable_ts_config": true
  }
}
```
