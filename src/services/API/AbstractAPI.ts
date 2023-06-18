import { createURL } from '@/utils/URLUtils'

export abstract class AbstractAPI {
  protected abstract readonly baseURL: string

  protected createURL(
    path: string,
    searchParams: Record<string, string | number>
  ) {
    return createURL(this.baseURL, path, searchParams)
  }
}
