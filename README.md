# ENKE.DEV lint

## Install packages

Make sure to install the necessary peer dependencies `eslint` and `prettier`.

```bash
npm i -D eslint prettier @enke.dev/lint
```

## Prepare config

Create a `eslint.config.js` file in the root of your project and add the following content:

```js
import eslintTs from 'typescript-eslint';
import config from '@enke.dev/lint';

export default eslintTs.config(...config);
```

If you intend to use Typescript for your config file, you have to do some trickery right now:

```bash
# install "jiti" once, to prevent an error
npm i -D jiti

# run eslint with a flag
eslint --flag unstable_ts_config -c eslint.config.ts
```
