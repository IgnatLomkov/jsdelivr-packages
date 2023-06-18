export function createURL(
  baseURL: string,
  pathname: string,
  searchParams?: Record<string, string | number>
) {
  const url = new URL(baseURL)
  url.pathname = pathnameJoin(url.pathname, pathname)
  if (searchParams)
    Object.entries(searchParams).forEach(([name, value]) => {
      url.searchParams.set(name, `${value}`)
    })

  return url
}

export function pathnameJoin(...parts: string[]) {
  return parts.join('/').replace(new RegExp('/{1,}', 'g'), '/')
}
