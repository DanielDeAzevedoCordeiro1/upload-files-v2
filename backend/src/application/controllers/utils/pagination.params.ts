export class PaginationParams {
  private constructor(public readonly page: number, public readonly limit: number) { }

  static create(page: string, limit: string): PaginationParams {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || isNaN(parsedLimit)) {
      throw new Error('Page and limit must be valid numbers');
    }

    if (parsedPage < 1 || parsedLimit < 1) {
      throw new Error('Page and limit must be greater than 0');
    }
    return new PaginationParams(parsedPage, parsedLimit);
  }

  getPage(): number {
    return this.page;
  }

  getLimit(): number {
    return this.limit;
  }
}