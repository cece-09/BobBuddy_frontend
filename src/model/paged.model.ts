/**
 *
 *
 * @class Paged
 * @template T
 */
export class Paged<T> {
  page: number
  size: number
  totalPage: number
  totalCount: number
  data: T[] = []

  /**
   * Creates an instance of Paged.
   * @param {Paged<T>} { page, size, totalPage, totalCount, data }
   * @memberof Paged
   */
  constructor({ page, size, totalPage, totalCount, data }: Paged<T>) {
    this.page = page
    this.size = size
    this.totalPage = totalPage
    this.totalCount = totalCount
    this.data = data ?? [] // shallow
  }

  /**
   *
   *
   * @static
   * @template T
   * @param {string} json
   * @return {*}
   * @memberof Paged
   */
  static fromJson<T>(json: string) {
    const obj = JSON.parse(json)
    return new Paged<T>({
      page: obj["page"],
      size: obj["size"],
      totalPage: obj["totalPage"],
      totalCount: obj["totalCount"],
      data: obj["data"],
    })
  }
}
