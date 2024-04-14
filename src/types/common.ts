/* eslint-disable no-unused-vars */
export type BottomNavbarKey = '/home' | 'match' | 'profile' | '/setting';

export type BottomNavbarItem = {
  icon: string;
  text: string;
  link: string;
};

export type MS = number;

export type ISOString = string;

export class Paged<T> {
  page: number;
  size: number;
  totalPage: number;
  totalCount: number;
  data: T[] = [];

  // 생성자
  constructor({ page, size, totalPage, totalCount, data }: Paged<T>) {
    this.page = page;
    this.size = size;
    this.totalPage = totalPage;
    this.totalCount = totalCount;
    this.data = data ?? []; // shallow
  }

  // JSON 스트링으로부터 객체 생성
  static fromJson<T>(json: string) {
    const obj = JSON.parse(json);
    return new Paged<T>({
      page: obj['page'],
      size: obj['size'],
      totalPage: obj['totalPage'],
      totalCount: obj['totalCount'],
      data: obj['data'],
    });
  }
}

export type ActionIcon = { iconName: string; onClick: () => void };

export enum PageType {
  PLAIN = 'PLAIN',
  MULTI_STEP = 'MULTI_STEP',
}

export enum TextType {
  HEADER = 'HEADER',
  SUB_HEADER = 'SUB_HEADER',
  APPBAR_TITLE = 'APPBAR_TITLE',
}

export enum Language {
  KOREAN = 'ko',
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Address {
  name?: string;
  address: string;
  latitude: number;
  longitude: number;
}
