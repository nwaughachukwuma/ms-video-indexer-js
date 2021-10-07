const nodeFetch = () => import('node-fetch')

function isBrowser() {
  return typeof window !== 'undefined' && globalThis === window
}

async function pFetch(url: string, options: any) {
  if (isBrowser()) {
    return window.fetch(url, options)
  }
  return await nodeFetch().then(({ default: fetch }) => fetch(url, options))
}

export const fetch = pFetch
export default pFetch
