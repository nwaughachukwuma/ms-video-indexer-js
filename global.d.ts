import 'jest-matcher-one-of'
declare module 'node-fetch'
declare module NodeJS {
  interface Global {
    fetch: any
  }
}
