/**
 * 페이지네이션 래퍼 클래스
 * @class Paged
 * @template T
 */
export class Paged<T> {
  page: number
  size: number
  totalPage: number
  totalCount: number
  data: T[] = []

  // 생성자
  constructor({ page, size, totalPage, totalCount, data }: Paged<T>) {
    this.page = page
    this.size = size
    this.totalPage = totalPage
    this.totalCount = totalCount
    this.data = data ?? [] // shallow
  }

  // JSON 스트링으로부터 객체 생성
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
