export const makeQueryString = (options: Record<string, any>) => {
  const qs = Object.keys(options)
    .filter((key) => !!options[key])
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        options[key.toString()],
      )}`
    })
    .join('&')

  return qs
}
