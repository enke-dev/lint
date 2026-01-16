      // provoke white space error

const unusedNotPrefixed = 123;
const unusedButProvokesTypescriptError = true;

unusedButProvokesTypescriptError = 'foo' // missing semicolon to trigger prettier

console.log('hello world'); // no console, or what?
