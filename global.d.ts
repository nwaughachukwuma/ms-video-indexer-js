declare global {
  namespace NodeJS {
    interface Global {
      fetch: any
    }
  }
}
