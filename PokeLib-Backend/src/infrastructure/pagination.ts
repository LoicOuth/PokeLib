import { IPagination } from 'src/application/common/interfaces/pagination.interface';

export class Pagination<T> implements IPagination<T> {
  data: T[];
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  constructor(
    data: T[],
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
  ) {
    this.data = data;
    this.page = page;
    this.take = take;
    this.itemCount = itemCount;
    this.pageCount = pageCount;
    this.hasPreviousPage = hasPreviousPage;
    this.hasNextPage = hasNextPage;
  }

  static paginated<T>(array: T[], page: number, take: number, itemCount: number): Pagination<T> {
    const start = (page - 1) * take;
    const end = start + take;

    const pageCount = Math.ceil(itemCount / take);
    const hasPreviousPage = page > 1;
    const hasNextPage = end < itemCount;

    return new this(array, page, take, itemCount, pageCount, hasPreviousPage, hasNextPage);
  }
}
