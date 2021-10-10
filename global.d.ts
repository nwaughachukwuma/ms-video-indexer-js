import 'jest-matcher-one-of'

declare module NodeJS {
  interface Global {
    fetch: any
  }
}
